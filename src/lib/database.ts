import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";

const initiated = process.env.DATABASE_URL || false;

export const dbClient = initiated ? new PrismaClient().$extends({
  result: {
    request: {
      formattedDate: {
        needs: { dateTime: true },
        compute(request) {
          return format(request.dateTime, "dd.LL.");
        },
      },
      formattedDateTime: {
        needs: { dateTime: true },
        compute(request) {
          return format(request.dateTime, "dd.LL.y, HH:mm");
        },
      },
      formattedDateWithYear: {
        needs: { dateTime: true },
        compute(request) {
          return format(request.dateTime, "dd.LL.y");
        },
      },
    },
  },
}) : null;

export async function getUpcomingEvents() {
  return initiated ? await dbClient!.request.findMany({
    where: {
      // only show events with a date in the future
      dateTime: { gte: new Date() },
    },
    orderBy: {
      // sort by date in ascending order
      dateTime: "asc",
    },
  }) : [];
}


export async function getOldEvents() {
  return initiated ? await dbClient!.request.findMany({
    where: {
      // only show events with a date in the past
      dateTime: { lt: new Date() },
    },
    orderBy: {
      // sort by date in descending order (newest first)
      dateTime: "desc",
    },
  }) : [];
}