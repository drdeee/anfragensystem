import Page from "@/components/Page";
import Event from "@/components/admin/Event";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { dbClient } from "@/lib/database";
import { Accordion, AccordionContent } from "@radix-ui/react-accordion";
import { Request } from "@prisma/client";

export default async function AdminPage() {
  const upcomingEvents = await dbClient.request.findMany({
    where: {
      dateTime: { gte: new Date() },
    },
    orderBy: {
      dateTime: "asc",
    },
  });

  const oldEvents = await dbClient.request.findMany({
    where: {
      dateTime: { lt: new Date() },
    },
    orderBy: {
      dateTime: "desc",
    },
  });

  async function deleteEvent(eventId: string) {
    "use server";
    await dbClient.request.delete({ where: { id: eventId } });
    return;
  }

  return (
    <Page title="Admin-Area">
      <Accordion type="single" collapsible defaultValue="pending">
        {oldEvents.length !== 0 && (
          <AccordionItem value="older">
            <AccordionTrigger>Vergangene Veranstaltungen</AccordionTrigger>
            <AccordionContent className="p-2">
              {oldEvents.map((event) => (
                <Event
                  key={event.id}
                  event={JSON.parse(JSON.stringify(event)) as Request}
                  deleteEvent={deleteEvent}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem value="pending">
          <AccordionTrigger>Anstehende Veranstaltungen</AccordionTrigger>
          <AccordionContent className="p-2">
            {upcomingEvents.map((event) => (
              <Event
                key={event.id}
                event={JSON.parse(JSON.stringify(event)) as Request}
                deleteEvent={deleteEvent}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Page>
  );
}
