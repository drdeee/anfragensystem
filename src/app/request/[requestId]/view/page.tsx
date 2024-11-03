import { dbClient } from "@/lib/database";
import templates from "@/templates";
import { notFound } from "next/navigation";
import { generateMetadata as metadata } from "../page";
import Page from "@/components/Page";

export const generateMetadata = metadata;

export default async function RequestViewPage(props: {
  params: { requestId: string };
  searchParams: { display?: boolean };
}) {
  const request = await dbClient.request.findUnique({
    where: {
      id: (await props.params).requestId,
    },
  });

  if (!request) notFound();

  return (
    <Page title={`${request.eventName} - ${request.formattedDateWithYear}`}>
      <b>Neue Veranstaltung: </b> {request.eventName}
      <br /> <br />
      <b>Veranstaltungsthema:</b>
      <br />
      {request.eventTopic}
      <br />
      <br />
      <b>Veranstalter*in:</b> {request.eventOrganizer}
      <br /> <br />
      <b>Art der Veranstaltung:</b>
      <br />
      {request.eventType} (
      {request.isStationary ? "stationär" : "nicht stationär"})<br /> <br />
      <b>Datum & Uhrzeit:</b>
      <br />
      {request.formattedDateTime}
      <br />
      {request.meetingTime && (
        <>
          <b>Gewünschte Ankunft:</b> {request.meetingTime} <br />
        </>
      )}
      <br />
      <b>Erwartetes Ende:</b> {request.expectedEndTime} <br /> <br />
      <b>Startort:</b> {request.startLocation}
      <br />
      {request.meetingLocation && (
        <>
          <b>Gewünschter Treffpunkt:</b> {request.meetingLocation}
          <br />
        </>
      )}{" "}
      <br />
      <b>Erwartete Teilnehmer*innen:</b> {request.expectedPeople} <br /> <br />
      <b>Geplantes Programm enthält:</b> <br />
      <ul>
        {request.programPoints.map((p) => (
          <li key={p}> {p} </li>
        ))}
      </ul>
      <br /> <br />
      <b>Kontakt:</b> {request.contactName} <br />
      <b>Telefonnummer:</b> {request.contactPhone} <br />
      {request.contactMail && (
        <>
          <b>Mail:</b>
          {request.contactMail}
        </>
      )}
      <br />
      {request.contactTelegram && (
        <>
          <b>Telegram:</b> {request.contactTelegram}{" "}
        </>
      )}
      {request.other && (
        <>
          <br /> <br />
          <b>Anmerkungen:</b>
          <br /> {request.other}
        </>
      )}
    </Page>
  );
}
