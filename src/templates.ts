const templates = {
  verificationMessage: `Hey <%= request.contactName %>, wir haben deine Anfrage erhalten!

Um Spam etc. zu verhindern, bitten wir dich deine Anfrage nochmal zu bestätigen. Nutze dazu bitte den folgenden Link:
<%= verificationLink %>

Diesen Link kannst du übrigens auch verwenden, um deine Anfrage zu aktualisieren.

Wir melden uns dann demnächst bei dir!

Liebe Grüße,
Lautis Dresden`,
};

export default templates;
