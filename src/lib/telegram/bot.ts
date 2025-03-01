import templates from "@/templates";
import { AvailabilityType, Request } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { render } from "ejs";
import { dbClient } from "../database";

class TelegramBot {
  private chatId = process.env.TELEGRAM_CHAT_ID;
  private threadIdNewRequests = process.env.TELEGRAM_THREAD_ID || "";
  private http = axios.create({
    baseURL: `${process.env.TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}`,
  });

  async logout() {
    console.log((await this.http.get("/logOut")).data);
  }

  private async _sendMessage(
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replyMarkup: any = undefined,
    threadId = Number.parseInt(this.threadIdNewRequests)
  ) {
    try {
      const response = await this.http.post("/sendMessage", {
        chat_id: this.chatId,
        message_thread_id: threadId,
        text: message,
        parse_mode: "html",
        reply_markup: replyMarkup,
      });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.response.data);
    }
  }
  async setWebook() {
    try {
      await this.http.post("/setWebhook", {
        url: `${process.env.BASE_URL}/api/webhooks/telegram`,
        secret_token: process.env.TELEGRAM_SECRET_TOKEN,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.response.data);
    }
  }

  async sendNewRequest(request: Request) {
    await this._sendMessage(
      render(
        templates.newRequestMessage,
        await this._requestMessageContext(request)
      ),
      this._replyMarkupNewRequest(request.id)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleWebhook(data: any) {
    if (data.callback_query) {
      if (data.callback_query.data) {
        const [type, detail, ...params] = data.callback_query.data.split("_");

        switch (type) {
          // first reaction
          case "i": {
            const request = await dbClient.request.findUnique({
              where: { id: params[0] },
            });
            if (!request) return;

            let availabilityType: AvailabilityType | undefined = undefined;

            switch (detail) {
              case "h": {
                await this._createThread(request);
                // TODO handle hat
                await this._callbackQuery(
                  data.callback_query.id,
                  "Currently not supportet"
                );
                return;
              }

              case "tl":
                availabilityType = "CanDrive";
                break;
              case "t":
                availabilityType = "Available";
                break;
              case "n":
                availabilityType = "Unavailable";
                break;
              case "u":
                availabilityType = "Unsure";
                break;
            }
            console.log(availabilityType, "t");
            const availability = await dbClient.availability.findFirst({
              where: {
                requestId: request.id,
                telegramId: data.callback_query.from.id,
              },
            });
            console.log(availability?.type, availabilityType);
            if (availability?.type === availabilityType) {
              await this._callbackQuery(
                data.callback_query.id,
                "Keine Änderung"
              );
              return;
            }
            if (availability) {
              await dbClient.availability.update({
                where: { id: availability.id },
                data: {
                  type: availabilityType,
                },
              });
            } else {
              const { first_name, username, id } = data.callback_query.from;
              await dbClient.availability.create({
                data: {
                  requestId: request.id,
                  telegramId: id,
                  userName: username,
                  firstName: first_name,
                  type: availabilityType!,
                },
              });
            }
            await this._updateRequestMessage(
              request,
              data.callback_query.message.message_id
            );
            await this._callbackQuery(data.callback_query.id, "Gespeichert");
            return;
          }
        }
      } else if (data.callback_query.game_short_name) {
        const app = data.callback_query.game_short_name;
        if (app === "anzeige") {
          try {
            await this._callbackQuery(
              data.callback_query.id,
              undefined,
              `${process.env.BASE_URL}/request/` +
              (
                await dbClient.overviewMessage.findFirst({
                  where: {
                    messageId: data.callback_query.message.message_id,
                  },
                })
              )?.requestId
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (e: any) {
            console.log(e.response.data);
          }
          return;
        } else {
          await this._callbackQuery(data.callback_query.id, "Error");
        }
      }
    }
  }

  private async _callbackQuery(
    queryId: string,
    message?: string,
    url?: string
  ) {
    await this.http.post("/answerCallbackQuery", {
      callback_query_id: queryId,
      text: message,
      url,
    });
  }

  private async _requestMessageContext(request: Request) {
    const availabilities = (
      await dbClient.availability.findMany({ where: { requestId: request.id } })
    ).map((a) => ({
      id: a.telegramId,
      type: a.type,
      name: a.userName
        ? `@${a.userName}`
        : `<a href="tg://user?id=${a.telegramId}">${a.firstName}</a>`,
    }));
    return {
      request,
      dateTime: format(request.dateTime, "dd.LL.y, HH:mm"),
      available: availabilities.filter((a) => a.type === "Available"),
      unavailable: availabilities.filter((a) => a.type === "Unavailable"),
      canDrive: availabilities.filter((a) => a.type === "CanDrive"),
      unsure: availabilities.filter((a) => a.type === "Unsure"),
      count: availabilities.length,
    };
  }

  private _replyMarkupNewRequest(requestId: string) {
    return {
      inline_keyboard: [
        [
          {
            text: "Kann Fahren",
            callback_data: `i_tl_${requestId}`,
          },
          {
            text: "Habe Zeit",
            callback_data: `i_t_${requestId}`,
          },
        ],
        [
          {
            text: "Habe keine Zeit",
            callback_data: `i_n_${requestId}`,
          },
          {
            text: "Noch unklar",
            callback_data: `i_u_${requestId}`,
          },
        ],
        [
          {
            text: "Ich möchte mir den Hut aufsetzen",
            callback_data: `i_h_${requestId}`,
          },
        ],
      ],
    };
  }

  private async _updateRequestMessage(request: Request, messageId: string) {
    try {
      await this.http.post("/editMessageText", {
        text: render(
          templates.newRequestMessage,
          await this._requestMessageContext(request)
        ),
        chat_id: this.chatId,
        message_id: messageId,
        parse_mode: "html",
        reply_markup: this._replyMarkupNewRequest(request.id),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.response.data);
    }
  }

  private async _pinMessage(
    messageId: string,
    disableNotification: boolean = true
  ) {
    await this.http.post("/pinChatMessage", {
      message_id: messageId,
      chat_id: this.chatId,
      disable_notification: disableNotification,
    });
  }

  private async _createThread(request: Request) {
    const thread = await this.http.post("/createForumTopic", {
      chat_id: this.chatId,
      name: `${format(request.dateTime, "dd.LL.")} ${request.eventName}`,
    });
    console.log(thread.data);
    await dbClient.request.update({
      where: { id: request.id },
      data: {
        telegramThreadId: thread.data.message_thread_id,
      },
    });
    /*
    const message = await this._sendMessage(
      render(templates.threadMessage, {
        request,
        dateTime: format(request.dateTime, "dd.LL."),
      }),
      {
        inline_keyboard: [
          [
            {
              text: "Übersicht öffnen",
              callback_game: "anzeige",
            },
          ],
        ],
      }
    );
    */
    try {
      const message = await this.http.post("/sendGame", {
        chat_id: this.chatId,
        message_thread_id: thread.data.result.message_thread_id,
        game_short_name: "anzeige",
        protect_content: true,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Anfrage anzeigen",
                callback_game: "anzeige",
              },
            ],
          ],
        },
      });
      console.log(message.data.result.message_id);
      const obj = await dbClient.overviewMessage.create({
        data: {
          messageId: message.data.result.message_id,
          requestId: request.id,
        },
      });

      console.log(obj);

      await this._pinMessage(message.data.result.message_id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(Object.keys(e));
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TelegramBot();
