import { initiateTelegramSession } from "./lib/telegram";

export async function register() {
  await initiateTelegramSession();
}
