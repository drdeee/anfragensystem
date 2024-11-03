import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";

export const dbClient = new PrismaClient().$extends({
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
});
