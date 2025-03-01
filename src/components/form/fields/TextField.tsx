import { Request } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { fieldValidators } from "../validation";
import { ZodAny } from "zod";
import { ChangeEvent, useState } from "react";

export default function TextField(props: {
  value?: string | number | null | Date;
  label: string;
  dataKey: keyof Request;
  datetime?: boolean;
  time?: boolean;
  area?: boolean;

  callback: (e: { [key: string]: string | null }) => void;
}) {
  const type = props.datetime ? "datetime-local" : props.time ? "time" : "text";
  const [isValid, setIsValid] = useState<"unkown" | "valid" | "invalid">(
    "unkown"
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validator: ZodAny = (fieldValidators as any)[props.dataKey];

  const callback = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setIsValid(
      validator.safeParse(e.target.value).success ? "valid" : "invalid"
    );
    props.callback({
      [props.dataKey]: e.target.value === "" ? null : e.target.value,
    });
  };

  return (
    <div className="mb-3 w-full">
      <Label className="font-bold" htmlFor={props.dataKey}>
        {props.label}
      </Label>
      {props.area ? (
        <Textarea
          id={props.dataKey}
          aria-label="input"
          className={
            "mt-1" +
            (isValid === "invalid"
              ? " border-red-700 focus-visible:ring-red-700 focus:ring-red-700"
              : "")
          }
          value={props.value ? (props.value as string) : ""}
          onChange={callback}
        />
      ) : (
        <Input
          id={props.dataKey}
          aria-label="input"
          type={type}
          className={
            "mt-1" +
            (isValid === "invalid"
              ? " border-red-700 focus-visible:ring-red-700 focus:ring-red-700"
              : "")
          }
          value={
            props.datetime && props.value
              ? format(props.value, "y-LL-dd'T'HH:mm")
              : props.value
                ? (props.value as string)
                : ""
          }
          onChange={callback}
        />
      )}
    </div>
  );
}
