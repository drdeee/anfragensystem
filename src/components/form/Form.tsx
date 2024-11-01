"use client";

import { Request } from "@prisma/client";
import TextField from "./fields/TextField";
import SelectOrOtherField from "./fields/SelectOrOtherField";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import ChecklistField from "./fields/ChecklistField";

interface FormProps {
  data?: Request;
}

type RequestData = Partial<Request>;

const tabs = ["general", "process", "program", "other"];

export default function Form(props: FormProps) {
  const [data, setData] = useState<RequestData>();
  const [currentTab, setCurrentTab] = useState("general");

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const updateValue = (d: {
    [key: string]: string | Date | undefined | string[];
  }) => setData({ ...data, ...d });

  const isNewRequest = props.data === undefined;

  return (
    <div className="form">
      <Tabs value={currentTab}>
        <div className="flex flex-row justify-center">
          <TabsList className="mx-auto">
            <TabsTrigger value="general" disabled={isNewRequest}>
              Generelles
            </TabsTrigger>
            <TabsTrigger value="process" disabled={isNewRequest}>
              Ablauf
            </TabsTrigger>
            <TabsTrigger value="program" disabled={isNewRequest}>
              Programm
            </TabsTrigger>
            <TabsTrigger value="other" disabled={isNewRequest}>
              Sonstiges
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general">
          <TextField
            label="Name der Veranstaltung *"
            dataKey="eventName"
            callback={updateValue}
            value={data?.eventName}
          />

          <TextField
            label="Thema der Veranstaltung *"
            dataKey="eventTopic"
            callback={updateValue}
            value={data?.eventTopic}
          />

          <TextField
            label="Veranstalter*in (Organisation, Initiative, etc.) *"
            dataKey="eventOrganizer"
            callback={updateValue}
            value={data?.eventOrganizer}
          />

          <SelectOrOtherField
            dataKey="eventType"
            label="Art der Veranstaltung *"
            options={["CSD", "Demo", "Gegendemo", "Straßenfest"]}
            labelOther="Andere Art"
            placeholderOther="Bitte hier eintragen"
            callback={updateValue}
            value={data?.eventType}
          />
          <TextField
            dataKey="expectedPeople"
            label="Erwartete Anzahl Teilnehmer*innen *"
            callback={updateValue}
            value={data?.expectedPeople}
          />
        </TabsContent>
        <TabsContent value="process">
          <TextField
            datetime
            dataKey="dateTime"
            label="Datum & Uhrzeit*"
            callback={updateValue}
            value={data?.dateTime?.toString()}
          />

          <TextField
            label="Startpunkt *"
            dataKey="startLocation"
            callback={updateValue}
            value={data?.startLocation}
          />

          <TextField
            time
            label="Geschätztes Ende *"
            dataKey="expectedEndTime"
            callback={updateValue}
            value={data?.expectedEndTime}
          />
          <div className="mt-5 text-sm pt-2 mb-3 border-t-2">
            Wenn wir mit der Technik schon vor dem regulären
            Veranstaltungsbeginn da sein sollen, fülle bitte die folgenden
            Felder aus:
          </div>
          <TextField
            label="Treffpunkt vor der Veranstaltung"
            dataKey="meetingLocation"
            callback={updateValue}
            value={data?.meetingLocation}
          />
          <TextField
            dataKey="meetingTime"
            label="Uhrzeit vor der Veranstaltung"
            callback={updateValue}
            time
            value={data?.meetingTime}
          />
          <div className="text-sm mt-3">
            Bitte für alle Angaben mitteleuropäische Zeit verwenden.{" "}
            {/* TODO comment to timezone required? */}
          </div>
        </TabsContent>
        <TabsContent value="program">
          <div className="text-sm">
            Damit wir planen können, was wir an Technik mitbringen müssen,
            brauchen wir einen Überblick darüber, was deiner Veranstaltung alles
            geplant ist.
          </div>
          <ChecklistField
            label="Wähle alles aus, was auf der Veranstaltung stattfinden soll: "
            dataKey="programPoints"
            values={data?.programPoints}
            options={[
              ["Redebeiträge"],
              ["Musik (via Spotify/Handy)"],
              ["DJ*anes"],
              [
                "Live-Musik",
                "<b>WICHTIG:</b> wenn es auf deiner Veranstaltung Live-Musik geben soll, melde dich unbedingt direkt an uns, um dafür genaue Absprachen zu treffen! Wir können leider technisch nicht alles realisieren, deswegen ist das unbedingt notwendig!",
              ],
            ]}
            callback={updateValue}
          />
        </TabsContent>
      </Tabs>
      <div className="flex flex-row justify-between mt-3">
        <Button
          disabled={currentTab === tabs[0]}
          onClick={() => {
            setCurrentTab(tabs[tabs.indexOf(currentTab) - 1]);
          }}
        >
          Zurück
        </Button>
        {currentTab === tabs[tabs.length - 1] ? (
          <Button>Abschicken!</Button>
        ) : (
          <Button
            onClick={() => {
              setCurrentTab(tabs[tabs.indexOf(currentTab) + 1]);
            }}
          >
            Weiter
          </Button>
        )}
      </div>
    </div>
  );
}
