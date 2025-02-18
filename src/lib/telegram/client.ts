import { Api, TelegramClient } from "telegram";
import { StoreSession } from "telegram/sessions";

const folderSession = new StoreSession(".telegram");
export const client = new TelegramClient(
  folderSession,
  Number.parseInt(process.env.TELEGRAM_API_ID || ""),
  process.env.TELEGRAM_API_HASH || "",
  {
    connectionRetries: 5,
  }
);

export async function initiateTelegramSession() {
  await client.start({
    phoneNumber: async () => "",
    password: async () => "",
    phoneCode: async () => "",
    onError: (err) => console.log(err),
  });
  console.log("Telegram client connected.");
}

async function ensureClientRunning() {
  if (!client.connected) await client.connect();
}

export async function sendTelegramMessage(options: {
  to: string;
  message: string;
}) {
  await ensureClientRunning();
  client.sendMessage(`@${options.to}`, {
    message: options.message,
  });
}
