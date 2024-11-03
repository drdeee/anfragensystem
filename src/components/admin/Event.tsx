"use client";

import { Request } from "@prisma/client";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Event({
  event,
  deleteEvent,
}: {
  event: Request;
  deleteEvent: (eventId: string) => Promise<void>;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-row p-2 gap-x-3 bg-slate-900 border-slate-950 border rounded-xl mb-2 items-center">
      <div className="flex flex-col w-1/4 text-sm">
        <div>{format(event.dateTime, "dd.LL.y, HH:mm")}</div>
        <div>{event.startLocation}</div>
      </div>
      <div className="flex-grow font-bold">{event.eventName}</div>
      <Button onClick={() => window.open("/request/" + event.id)}>
        Ansehen
      </Button>
      <Button
        onClick={async () => {
          if (
            confirm(
              `Willst du die Anfrage (${event.eventName}) wirklich löschen?`
            )
          )
            await deleteEvent(event.id);
          router.refresh();
        }}
      >
        Löschen
      </Button>
    </div>
  );
}
