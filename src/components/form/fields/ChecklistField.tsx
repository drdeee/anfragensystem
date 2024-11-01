import { Request } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function ChecklistField(props: {
  label: string;
  dataKey: keyof Request;
  values?: string[];
  options: [value: string, description?: string][];
  allowOther?: boolean;
  callback: (e: { [key: string]: string[] }) => void;
}) {
  const update = (value: string) => () => {
    if (props.values?.includes(value))
      props.callback({
        [props.dataKey]: props.values.filter((v) => v !== value),
      });
    else props.callback({ [props.dataKey]: [...(props.values || []), value] });
  };

  const defaultOptions = props.options.map((o) => o[0]);

  return (
    <div className="mb-3">
      <Label className="font-bold" htmlFor={props.dataKey}>
        {props.label}
      </Label>
      <div className="mt-1 ml-2">
        {[
          ...props.options,
          ...(props.values || [])
            .filter((v) => !defaultOptions.includes(v))
            .map((v) => [v] as [value: string]),
        ].map((option) => {
          const [value, description] = option;
          return (
            <div
              key={value}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={update(value)}
            >
              <Checkbox checked={props.values?.includes(value)} id={value} />
              <div>
                <label
                  onClick={update(value)}
                  htmlFor={value}
                  className="text-sm leading-none cursor-pointer peer-disabled:opacity-7 font-medium"
                >
                  {value}
                </label>
                {description && (
                  <div
                    className="text-sm font-light"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
