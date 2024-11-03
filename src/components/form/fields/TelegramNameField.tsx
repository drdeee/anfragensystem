import { Request } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TelegramNameField(props: {
  value?: string | null;
  label: string;
  dataKey: keyof Request;

  callback: (e: { [key: string]: string | null }) => void;
}) {
  return (
    <div className="mb-3 w-full">
      <Label className="font-bold" htmlFor={props.dataKey}>
        {props.label}
      </Label>

      <Input
        id={props.dataKey}
        type="text"
        value={!props.value ? "" : props.value}
        onChange={(e) =>
          props.callback({
            [props.dataKey]: e.target.value === "" ? null : e.target.value,
          })
        }
      />

      <div className="mt-1 text-sm">Kein @ am Beginn verwenden.</div>
    </div>
  );
}
