import Page from "@/components/Page";
import { dbClient } from "@/lib/database";
import { format } from "date-fns";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export default async function AdminPage() {
  const upcomingEvents = await dbClient.request.findMany({
    where: {
      dateTime: { gte: new Date() },
    },
    orderBy: {
      dateTime: "asc",
    },
  });
  return (
    <Page title="Admin-Area">
      {upcomingEvents.map((event) => (
        <div
          key={event.id}
          className="flex flex-row p-2 gap-x-3 bg-slate-900 border-slate-950 border rounded-xl mb-2 items-center"
        >
          <div className="flex flex-col w-1/4 text-sm">
            <div>{format(event.dateTime, "dd.LL.y, HH:mm")}</div>
            <div>{event.startLocation}</div>
          </div>
          <div className="flex-grow font-bold">{event.eventName}</div>
          <div className="h-full">Löschen</div>
        </div>
      ))}
    </Page>
  );
}
