/* eslint-disable @typescript-eslint/no-require-imports */
const {TelegramClient} = require("telegram");
const { StoreSession } = require("telegram/sessions");
const { createInterface } = require("readline");

require("dotenv").config()

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const folderSession = new StoreSession(".telegram");
const client = new TelegramClient(
  folderSession,
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
  await client.disconnect();
  process.exit()
})()

