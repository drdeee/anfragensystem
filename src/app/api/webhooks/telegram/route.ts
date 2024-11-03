import bot from "@/lib/telegram/bot";

export async function POST(request: Request) {
  if (
    request.headers.get("X-Telegram-Bot-Api-Secret-Token") !==
    process.env.TELEGRAM_SECRET_TOKEN
  )
    return Response.json({ status: "error" }, { status: 401 });

  bot.handleWebhook(await request.json());
  return Response.json({ status: "ok" });
}
