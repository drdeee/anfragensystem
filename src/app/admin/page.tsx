import Page from "@/components/Page";
import Event from "@/components/admin/Event";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { dbClient, getOldEvents, getUpcomingEvents } from "@/lib/database";
import { Accordion, AccordionContent } from "@radix-ui/react-accordion";
import { Request } from "@prisma/client";

/**
 * Admin page: view & delete requests
 */
export default async function AdminPage() {
  // get all upcoming events
  const upcomingEvents = await getUpcomingEvents();

  // get all previous events
  const oldEvents = await getOldEvents();

  /**
   * Server-side function to delete a request/event.
   * @param {string} eventId - the id of the event to delete
   * @returns {Promise<void>}
   */
  async function deleteEvent(eventId: string): Promise<void> {
    "use server";
    // delete the event with the given id
    await dbClient!.request.delete({ where: { id: eventId } });
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
                  // convert the event to a plain JS object using JSON.parse
                  event={JSON.parse(JSON.stringify(event)) as Request}
                  // pass the deleteEvent function to the Event component
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
                // convert the event to a plain JS object using JSON.parse
                event={JSON.parse(JSON.stringify(event)) as Request}
                // pass the deleteEvent function to the Event component
                deleteEvent={deleteEvent}
              />
            ))}
            {upcomingEvents.length == 0 && <span className="text-sm">
              Keine Anstehenden Events :(
            </span>}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Page>
  );
}
