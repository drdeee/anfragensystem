import { Request } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TextField(props: {
  label: string;
  dataKey: keyof Request;
  callback: (e: { [key: string]: string }) => void;
}) {
  return (
    <div className="mb-3">
      <Label className="font-bold" htmlFor={props.dataKey}>
        {props.label}
      </Label>
      <Input
        id={props.dataKey}
        className="mt-1"
        onChange={(e) => props.callback({ [props.dataKey]: e.target.value })}
      />
    </div>
  );
}
