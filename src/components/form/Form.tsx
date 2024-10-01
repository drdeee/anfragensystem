"use client";

import { Request } from "@prisma/client";
import TextField from "./fields/TextField";
import SelectOrOtherField from "./fields/SelectOrOtherField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useEffect, useState } from "react";

interface FormProps {
  data?: Request;
}

type RequestData = Partial<Request>;

export default function Form(props: FormProps) {
  const [data, setData] = useState<RequestData>();

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const updateValue = (d: { [key: string]: string }) =>
    setData({ ...data, ...d });

  return (
    <div className="form">
      <Accordion type="multiple" className="text-sm" defaultValue={["general"]}>
        <AccordionItem value="general">
          <AccordionTrigger className="text-base font-bold uppercase">
            Generelles
          </AccordionTrigger>
          <AccordionContent className="border-1 border-slate-600">
            <TextField
              label="Name der Veranstaltung"
              dataKey="eventName"
              callback={updateValue}
            />

            <TextField
              label="Thema der Veranstaltung"
              dataKey="eventTopic"
              callback={updateValue}
            />

            <TextField
              label="Veranstalter*in (Organisation, Initiative, etc.)"
              dataKey="eventOrganizer"
              callback={updateValue}
            />

            <SelectOrOtherField
              dataKey="eventType"
              label="Art der Veranstaltung"
              options={["CSD", "Demo", "Gegendemo", "Straßenfest"]}
              labelOther="Andere Art"
              placeholderOther="Bitte hier eintragen"
              callback={updateValue}
            />
            <TextField
              dataKey="expectedPeople"
              label="Erwartete Teilnehmer*innen"
              callback={updateValue}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="process">
          <AccordionTrigger>Ablauf</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
        <AccordionItem value="program">
          <AccordionTrigger>Programm</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
        <AccordionItem value="contact">
          <AccordionTrigger>Kontakt</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
