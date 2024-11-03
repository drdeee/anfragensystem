import axios from "axios";
import { listAllBoards, listAllStacks } from "./lib/nextcloud";

export async function register() {
  if (!process.env.NEXTCLOUD_BOARD_ID) {
    console.log("NO BOARD ID CONFIGURED!!!");
    await listAllBoards();
  } else if (!process.env.NEXTCLOUD_DEFAULT_STACK_ID) {
    console.log("NO STACK ID CONFIGURED!!!");
    await listAllStacks();
  }

  // setup telegram webhook
  try {
    await axios.post(
      "/setWebhook",
      {
        url: `${process.env.BASE_URL}/api/webhooks/telegram`,
        secret_token: process.env.TELEGRAM_SECRET_TOKEN,
      },
      {
        baseURL: `${process.env.TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}`,
      }
    );
  } catch (e: any) {
    console.log(e.response.data);
  }
}
