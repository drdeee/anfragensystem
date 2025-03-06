import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const session = new StringSession(process.env.TELEGRAM_SESSION || "");

let client: TelegramClient;

export async function initiateTelegramSession() {
  if (!client) client = new TelegramClient(
    session,
    Number.parseInt(process.env.TELEGRAM_API_ID || ""),
    process.env.TELEGRAM_API_HASH || "",
    {
      connectionRetries: 5,
    }
  );
  await client.start({
    phoneNumber: async () => "",
    password: async () => "",
    phoneCode: async () => "",
    onError: (err) => console.log(err),
  });
  console.log("Telegram client connected.");
}

async function ensureClientRunning() {
  if (client == undefined) await initiateTelegramSession()
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
