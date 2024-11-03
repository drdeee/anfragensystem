const templates = {
  verificationMessage: `Hey <%= request.contactName %>, wir haben deine Anfrage erhalten!

Um Spam etc. zu verhindern, bitten wir dich deine Anfrage nochmal zu bestätigen. Nutze dazu bitte den folgenden Link:
<%= verificationLink %>

Diesen Link kannst du übrigens auch verwenden, um deine Anfrage zu aktualisieren.

Wir melden uns dann demnächst bei dir!

Liebe Grüße,
Lautis Dresden`,
  cardDescription: `**Veranstaltungsname:**
  <%= request.eventName %>

**Veranstaltungsthema:**
<%= request.eventTopic %>

**Veranstalter*in:** <%= request.eventOrganizer %>

**Art der Veranstaltung:**
<%= request.eventType %> <% if (request.isStationary) { %>(stationär)<% } else { %>(nicht stationär)<% } %>

**Datum & Uhrzeit:**
<%= request.formattedDateTime %>
<% if (request.meetingTime) { %>**Gewünschte Ankunft:** <%= request.meetingTime %><% } %>

**Erwartetes Ende:** <%= request.expectedEndTime %>

**Startort:** <%= request.startLocation %>
<% if (request.meetingLocation) { %>**Gewünschter Treffpunkt:** <%= request.meetingLocation %><% } %>

**Erwartete Teilnehmer*innen:** <%= request.expectedPeople %>

**Geplantes Programm enthält:**
<% request.programPoints.forEach((p) => { %>- <%= p %><% }) %>

**Kontakt:** <%= request.contactName %>
**Telefonnummer:** <%= request.contactPhone %>
<% if (request.contactMail) { %>**Mail:** <%= request.contactMail %><% } %>
<% if (request.contactTelegram) { %>**Telegram:** @<%= request.contactTelegram %><% } %>

<% if (request.other) { %>**Anmerkungen:**
<%= request.other %><% } %>

`,
  newRequestMessage: `<b>Neue Veranstaltung: </b> <%= request.eventName %>

<b>Veranstaltungsthema:</b>
<%= request.eventTopic %>

<b>Veranstalter*in:</b> <%= request.eventOrganizer %>

<b>Art der Veranstaltung:</b>
<%= request.eventType %> <% if (request.isStationary) { %>(stationär)<% } else { %>(nicht stationär)<% } %>

<b>Datum & Uhrzeit:</b>
<%= request.formattedDateTime %>
<% if (request.meetingTime) { %><b>Gewünschte Ankunft:</b> <%= request.meetingTime %><% } %>

<b>Erwartetes Ende:</b> <%= request.expectedEndTime %>

<b>Startort:</b> <%= request.startLocation %>
<% if (request.meetingLocation) { %><b>Gewünschter Treffpunkt:</b> <%= request.meetingLocation %><% } %>

<b>Erwartete Teilnehmer*innen:</b> <%= request.expectedPeople %>

<b>Geplantes Programm enthält:</b>
<% request.programPoints.forEach((p) => { %>- <%= p %>
<% }) %>

<b>Kontakt:</b> <%= request.contactName %>
<b>Telefonnummer:</b> <%= request.contactPhone %>
<% if (request.contactMail) { %><b>Mail:</b> <%= request.contactMail %><% } %>
<% if (request.contactTelegram) { %><b>Telegram:</b> @<%= request.contactTelegram %><% } %>
<% if (request.other) { %>

<b>Anmerkungen:</b>
<%= request.other %><% } %>

<blockquote>Bitte reagiert alle auf die Nachricht, je nachdem ob ihr bei der Veranstaltung könntet.<% if(count !== 0) { %>

<%if (canDrive.length) { %>Kann fahren: <% canDrive.forEach((a) => { %><%- a.name %> <% }) %>
<% } %><%if (available.length) { %>Haben Zeit: <% available.forEach((a) => { %><%- a.name %> <% }) %>
<% } %><%if (unavailable.length) { %>Keine Zeit: <% unavailable.forEach((a) => { %><%- a.name %> <% }) %>
<% } %><%if (unsure.length) { %>Noch unklar: <% unsure.forEach((a) => { %><%- a.name %> <% }) %>
<% } %><% } %> </blockquote>`,
  requestInfo: `<b>Neue Veranstaltung: </b> <%= request.eventName %>

<b>Veranstaltungsthema:</b>
<%= request.eventTopic %>

<b>Veranstalter*in:</b> <%= request.eventOrganizer %>

<b>Art der Veranstaltung:</b>
<%= request.eventType %> <% if (request.isStationary) { %>(stationär)<% } else { %>(nicht stationär)<% } %>

<b>Datum & Uhrzeit:</b>
<%= request.formattedDateTime %>
<% if (request.meetingTime) { %><b>Gewünschte Ankunft:</b> <%= request.meetingTime %><% } %>

<b>Erwartetes Ende:</b> <%= request.expectedEndTime %>

<b>Startort:</b> <%= request.startLocation %>
<% if (request.meetingLocation) { %><b>Gewünschter Treffpunkt:</b> <%= request.meetingLocation %><% } %>

<b>Erwartete Teilnehmer*innen:</b> <%= request.expectedPeople %>

<b>Geplantes Programm enthält:</b>
<% request.programPoints.forEach((p) => { %>- <%= p %>
<% }) %>

<b>Kontakt:</b> <%= request.contactName %>
<b>Telefonnummer:</b> <%= request.contactPhone %>
<% if (request.contactMail) { %><b>Mail:</b> <%= request.contactMail %><% } %>
<% if (request.contactTelegram) { %><b>Telegram:</b> @<%= request.contactTelegram %><% } %>
<% if (request.other) { %>

<b>Anmerkungen:</b>
<%= request.other %><% } %>
`,
  threadMessage: `<b><%= request.formattedDateTime %> <%= request.eventName %></b>
Bitte den folgenden Button für einen Überblick anklicken.`,
};

export default templates;
