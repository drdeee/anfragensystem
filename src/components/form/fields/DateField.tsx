import { Request } from "@prisma/client";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { de } from "date-fns/locale";

export default function DateField(props: {
  label: string;
  dataKey: keyof Request;
  value?: Date;
  callback: (e: { [key: string]: Date | undefined }) => void;
}) {
  return (
    <div className="mb-3">
      <Label className="font-bold" htmlFor={props.dataKey}>
        {props.label}
      </Label>
      <div className="mt-1">
        <Popover>
          <PopoverTrigger asChild className="bg-transparent backdrop-blur">
            <Button
              className={cn(
                "w-[280px] justify-start text-left font-normal text-sm",
                !props.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {props.value ? (
                format(props.value, "PPP", { locale: de })
              ) : (
                <span>Datum auswählen</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 dark">
            <Calendar
              mode="single"
              className="dark"
              locale={de}
              selected={props.value}
              onSelect={(d) => props.callback({ [props.dataKey]: d })}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
