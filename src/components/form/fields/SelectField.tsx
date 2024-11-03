import { Request } from "@prisma/client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";

export default function SelectField(props: {
  label: string;
  dataKey: keyof Request;
  options: string[];
  value?: string;
  callback: (e: { [key: string]: string }) => void;
}) {
  const returnData = (data: string) =>
    props.callback({ [props.dataKey]: data });

  return (
    <div className="mb-3">
      <Label className="font-bold" htmlFor={props.dataKey}>
        {props.label}
      </Label>
      <div className="mt-1">
        <Select
          value={props.value || "Auswählen..."}
          onValueChange={(value) => returnData(value)}
        >
          <SelectTrigger>
            <SelectValue>{props.value}</SelectValue>
          </SelectTrigger>
          <SelectContent className="text-sm">
            <SelectGroup>
              {props.options.map((option) => (
                <SelectItem key={option} value={option} className="p-1">
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
