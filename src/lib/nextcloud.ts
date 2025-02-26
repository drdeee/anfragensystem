import axios, { AxiosError } from "axios";

const http = axios.create({
  baseURL: process.env.NEXTCLOUD_URL,
  auth: {
    username: process.env.NEXTCLOUD_USER || "",
    password: process.env.NEXTCLOUD_PASSWORD || "",
  },
  headers: {
    "OCS-APIRequest": "true",
  },
});

const BOARD_ID = process.env.NEXTCLOUD_BOARD_ID;
const STACK_ID = process.env.NEXTCLOUD_DEFAULT_STACK_ID;

export async function listAllBoards() {
  const boards = await http.get("/apps/deck/api/v1.0/boards");
  console.log("== List of all boards (required for configuration) ==");
  boards.data.forEach((board: { title: string; id: number }) =>
    console.log(`${board.title} - ${board.id}`)
  );
}

export async function listAllStacks() {
  const boards = await http.get(
    `/apps/deck/api/v1.0/boards/${BOARD_ID}/stacks`
  );
  console.log("== List of all stacks (required for configuration) ==");
  boards.data.forEach((stack: { title: string; id: number }) =>
    console.log(`${stack.title} - ${stack.id}`)
  );
}

export async function createCard({
  title,
  description,
  duedate,
}: {
  title: string;
  description: string;
  duedate: Date;
}): Promise<{ cardId: number; stackId: number } | null> {
  if (!process.env.NEXTCLOUD_ENABLED) return { cardId: -1, stackId: -1 };
  try {
    const card = await http.post(
      `/apps/deck/api/v1.0/boards/${BOARD_ID}/stacks/${STACK_ID}/cards`,
      {
        title,
        description,
        duedate: duedate.toISOString(),
      }
    );
    return card.data.id;
  } catch (e: any) {
    return null;
  }
}
