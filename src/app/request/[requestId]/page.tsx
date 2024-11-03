import Form from "@/components/form/Form";
import Notice from "@/components/Notice";
import Page from "@/components/Page";
import { dbClient } from "@/lib/database";
import { Request } from "@prisma/client";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { createCard } from "@/lib/nextcloud";
import { render } from "ejs";
import templates from "@/templates";
import bot from "@/lib/telegram/bot";

export async function generateMetadata({
  params,
}: {
  params: { requestId: string };
}) {
  const request = await dbClient.request.findUnique({
    where: { id: (await params).requestId },
  });
  if (request)
    return {
      title: `${request.eventName} - ${request.formattedDateWithYear} | Lautis Dresden`,
    };
}

export default async function RequestPage(props: {
  params: { requestId: string };
}) {
  const request = await dbClient.request.findUnique({
    where: {
      id: (await props.params).requestId,
    },
  });

  if (!request) notFound();

  let contactVerificated: boolean | undefined;

  if (!request.contactVerified) {
    await dbClient.request.update({
      where: { id: request.id },
      data: { contactVerified: new Date() },
    });
    contactVerificated = true;

    const card = await createCard({
      title: `${request.eventName} (${request.eventOrganizer})`,
      description: render(templates.cardDescription, {
        request,
      }),
      duedate: request.dateTime,
    });
    await dbClient.request.update({
      where: { id: request.id },
      data: {
        stackId: card?.stackId || null,
        cardId: card?.cardId || null,
      },
    });
    await bot.sendNewRequest(request);
  }

  async function updateRequest() {
    "use server";
    return { status: "error" };
  }

  return (
    <Page title={`${request.eventName} - ${request.formattedDateWithYear}`}>
      {contactVerificated && (
        <Notice color="green">
          Deine Anfrage wurde erfolgreich verifiziert.
        </Notice>
      )}
      <Form
        data={JSON.parse(JSON.stringify(request)) as Request}
        submit={updateRequest}
      />
    </Page>
  );
}
