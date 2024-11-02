import { Request } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

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
  return (
    <div className="mb-3 w-full">
      <Label className="font-bold" htmlFor={props.dataKey}>
        {props.label}
      </Label>
      {props.area ? (
        <Textarea
          id={props.dataKey}
          className="mt-1"
          value={props.value ? (props.value as string) : ""}
          onChange={(e) =>
            props.callback({
              [props.dataKey]: e.target.value === "" ? null : e.target.value,
            })
          }
        />
      ) : (
        <Input
          id={props.dataKey}
          type={type}
          className="mt-1"
          value={
            props.datetime && props.value
              ? format(props.value, "y-LL-dd'T'HH:mm")
              : props.value
              ? (props.value as string)
              : ""
          }
          onChange={(e) =>
            props.callback({
              [props.dataKey]: e.target.value === "" ? null : e.target.value,
            })
          }
        />
      )}
    </div>
  );
}
