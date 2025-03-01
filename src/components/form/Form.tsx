"use client";

import { Request } from "@prisma/client";
import TextField from "./fields/TextField";
import SelectField from "./fields/SelectField";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import ChecklistField from "./fields/ChecklistField";
import { validators } from "./validation";
import { SafeParseReturnType } from "zod";

type RequestData = Partial<Request>;

interface FormProps {
  data?: Request;
  initial?: boolean;
  requestId?: string;
  submit: (data: RequestData, requestId?: string) => Promise<{ status: string; channel?: string }>;
}

const tabs = ["general", "process", "program", "other"] as const;

export default function Form(props: FormProps) {
  const [data, setData] = useState<RequestData>();
  const [currentTab, setCurrentTab] =
    useState<(typeof tabs)[number]>("general");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [validation, setValidation] = useState<SafeParseReturnType<any, any>>();

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    validators[currentTab]!.safeParseAsync(data).then((result) => {
      setValidation(result);
    });
  }, [currentTab, data]);

  const updateValue = (d: {
    [key: string]: string | Date | undefined | string[] | boolean | null;
  }) => {
    setData({ ...data, ...d });
  };

  return (
    <div className="form">
      <Tabs
        value={currentTab}
        onValueChange={(tab: string) =>
          setCurrentTab(tab as (typeof tabs)[number])
        }
      >
        <div className="flex flex-row justify-center">
          <TabsList className="mx-auto">
            <TabsTrigger value="general" disabled={props.initial}>
              Generelles
            </TabsTrigger>
            <TabsTrigger value="process" disabled={props.initial}>
              Ablauf
            </TabsTrigger>
            <TabsTrigger value="program" disabled={props.initial}>
              Programm
            </TabsTrigger>
            <TabsTrigger value="other" disabled={props.initial}>
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

          <SelectField
            dataKey="eventType"
            label="Art der Veranstaltung *"
            options={[
              "CSD",
              "Demo",
              "Gegendemo",
              "Straßenfest",
              "Andere Art (hinten dazuschreiben!)",
            ]}
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
            value={data?.dateTime}
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
          <SelectField
            dataKey="isStationary"
            label="Soll es einen Demozug geben? *"
            options={["Ja", "Nein"]}
            value={
              data?.isStationary === undefined
                ? undefined
                : data.isStationary
                  ? "Nein"
                  : "Ja"
            }
            callback={(e: { [key: string]: string }) => {
              updateValue({
                ["isStationary"]: e["isStationary"] === "Nein",
              });
            }}
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
        <TabsContent value="other">
          <TextField
            label="Dein Name *"
            dataKey="contactName"
            callback={updateValue}
            value={data?.contactName}
          />
          <TextField
            label="Deine Telefonnummer *"
            dataKey="contactPhone"
            callback={updateValue}
            value={data?.contactPhone}
          />
          <div className="text-sm mt-5 mb-3">
            Wir benötigen entweder deine Mailadresse oder deinen
            Telegram-Username, um dir automatisch Erinnerungen zu schicken,
            falls uns noch Informationen fehlen sollten.
          </div>
          <TextField
            label="Deine Mailadresse"
            dataKey="contactMail"
            value={data?.contactMail}
            callback={updateValue}
          />
          <TextField
            label="Dein Telegram-Username"
            dataKey="contactTelegram"
            value={data?.contactTelegram}
            callback={updateValue}
          />

          <div className="mt-5">
            <TextField
              label="Sonstiges"
              area
              value={data?.other}
              dataKey="other"
              callback={updateValue}
            />
          </div>
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
        {(!props.initial || currentTab === tabs[tabs.length - 1]) && (
          <Button
            disabled={!validation?.success}
            onClick={() =>
              props
                .submit(validators.all.safeParse(data).data as Request, props.requestId)
                .then((data) => console.log(data))
            }
          >
            {props.initial ? "Absenden" : "Speichern"}
          </Button>
        )}

        <Button
          disabled={
            currentTab === tabs[tabs.length - 1] || !validation?.success
          }
          onClick={() => {
            setCurrentTab(tabs[tabs.indexOf(currentTab) + 1]);
          }}
        >
          Weiter
        </Button>
      </div>
    </div>
  );
}
