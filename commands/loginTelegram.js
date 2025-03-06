/* eslint-disable @typescript-eslint/no-require-imports */
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { createInterface } = require("readline");

require("dotenv").config()

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const session = new StringSession("")
const client = new TelegramClient(
  session,
  Number.parseInt(process.env.TELEGRAM_API_ID || ""),
  process.env.TELEGRAM_API_HASH || "",
  {
    connectionRetries: 5,
  }
);

(async () => {
  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your number: ", resolve)
      ),
    password: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your password: ", resolve)
      ),
    phoneCode: async () =>
      new Promise((resolve) =>
        rl.question("Please enter the code you received: ", resolve)
      ),
    onError: (err) => console.log(err),
  });
  console.log(session.save())
  await client.disconnect();
  process.exit()
})()

