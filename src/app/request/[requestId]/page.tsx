import Form from "@/components/form/Form";
import Notice from "@/components/Notice";
import Page from "@/components/Page";
import { dbClient } from "@/lib/database";
import { Request } from "@prisma/client";
import { notFound } from "next/navigation";
import { createCard } from "@/lib/nextcloud";
import { render } from "ejs";
import templates from "@/templates";
import bot from "@/lib/telegram/bot";
import { headers } from 'next/headers'
import { validators } from "@/components/form/validation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const request = await dbClient!.request.findUnique({
    where: { id: (await params).requestId },
  });
  if (request)
    return {
      title: `${request.eventName} - ${request.formattedDateWithYear} | Lautis Dresden`,
    };
}

export default async function RequestPage({ params }: {
  params: Promise<{ requestId: string }>
}) {
  const requestId = (await params).requestId
  const request = await dbClient!.request.findUnique({
    where: {
      id: requestId,
    },
  });

  if (!request) notFound();

  let contactVerificated: boolean | undefined;

  if (!request.contactVerified) {
    const userAgent = (await headers()).get("user-agent")
    if (userAgent !== "TelegramBot (like TwitterBot)") {
      await dbClient!.request.update({
        where: { id: request.id },
        data: { contactVerified: new Date() },
      });
      contactVerificated = true;

      if (process.env.NEXTCLOUD_ENABLED) {
        const card = await createCard({
          title: `${request.eventName} (${request.eventOrganizer})`,
          description: render(templates.cardDescription, {
            request,
          }),
          duedate: request.dateTime,
        });
        await dbClient!.request.update({
          where: { id: request.id },
          data: {
            stackId: card?.stackId || null,
            cardId: card?.cardId || null,
          },
        });
      }
      await bot.sendNewRequest(request);
    }
  }

  async function updateRequest(requestData: Partial<Request>, requestId?: string) {
    "use server";
    const data = validators.all.safeParse(requestData)
    const request = await dbClient!.request.findUnique({
      where: {
        id: requestId
      }
    })
    if (!request || !data.success) return { status: "error" };
    await dbClient!.request.update({ where: { id: requestId }, data: data.data as Request })
    return { status: "success" };
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
        requestId={request.id}
        submit={updateRequest}
      />
    </Page>
  );
}
