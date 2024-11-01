import { Request } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TextField(props: {
  value?: string | number | null;
  label: string;
  dataKey: keyof Request;
  datetime?: boolean;
  time?: boolean;

  callback: (e: { [key: string]: string }) => void;
}) {
  const type = props.datetime ? "datetime-local" : props.time ? "time" : "text";
  return (
    <div className="mb-3 w-full">
      <Label className="font-bold" htmlFor={props.dataKey}>
        {props.label}
      </Label>
      <Input
        id={props.dataKey}
        type={type}
        className="mt-1"
        value={props.value === null ? undefined : props.value}
        onChange={(e) => props.callback({ [props.dataKey]: e.target.value })}
      />
    </div>
  );
}
