import { listAllBoards, listAllStacks } from "./lib/nextcloud";

export async function register() {
  if (!process.env.NEXTCLOUD_BOARD_ID) {
    console.log("NO BOARD ID CONFIGURED!!!");
    await listAllBoards();
  } else if (!process.env.NEXTCLOUD_DEFAULT_STACK_ID) {
    console.log("NO STACK ID CONFIGURED!!!");
    await listAllStacks();
  }
  // await initiateTelegramSession();
}
