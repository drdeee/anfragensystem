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
<%= dateTime %>
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
};

export default templates;
