import Form from "@/components/form/Form";
import Page from "@/components/Page";
import { dbClient } from "@/lib/database";
import { sendMail } from "@/lib/mail";
import { sendTelegramMessage } from "@/lib/telegram";
import templates from "@/templates";
import { Request } from "@prisma/client";
import { render } from "ejs";

export default function Home() {
  async function createRequest(requestData: Partial<Request>) {
    "use server";

    try {
      const request = await dbClient.request.create({
        data: requestData as Omit<
          Request,
          "id" | "createdAt" | "updatedAt" | "cardId" | "telegramThreadId"
        >,
      });

      const message = render(templates.verificationMessage, {
        request,
        verificationLink: `${process.env.BASE_URL}/request/${request.id}`,
      });

      if (requestData.contactTelegram) {
        await sendTelegramMessage({
          to: requestData.contactTelegram,
          message,
        });
        return { status: "ok", channel: "telegram" };
      } else if (requestData.contactMail) {
        await sendMail({
          to: requestData.contactMail,
          subject: "Bitte bestätige deine Anfrage",
          content: message,
        });
        return { status: "ok", channel: "mail" };
      }
    } catch (e) {
      console.log("Error creating request:", e);
    } finally {
      return { status: "error" };
    }
  }

  return (
    <Page title="Technik anfragen!">
      <div className="mb-3">
        <b>Du benötigst für eine Veranstaltung (Ton-)Technik?</b> Dann bist du
        hier genau richtig! Mit dem folgenden Formular kannst du bei uns Technik
        anfragen.
      </div>
      <Form submit={createRequest} />
    </Page>
  );
}
