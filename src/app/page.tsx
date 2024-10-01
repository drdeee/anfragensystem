import Form from "@/components/form/Form";
import Page from "@/components/Page";

export default function Home() {
  return (
    <Page title="Technik anfragen!">
      <div className="mb-3">
        <b>Du benötigst für eine Veranstaltung (Ton-)Technik?</b> Dann bist du
        hier genau richtig! Mit dem folgenden Formular kannst du bei uns Technik
        anfragen.
      </div>
      <Form />
    </Page>
  );
}
