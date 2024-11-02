import { PropsWithChildren } from "react";

const classes = {
  green: "bg-green-800 border-green-800",
  yellow: "bg-yellow-600 border-yellow-600",
  red: "bg-red-700 border-red-700",
  blue: "bg-blue-800 border-blue-800",
};

export default function Notice(
  props: PropsWithChildren<{ color: "green" | "red" | "yellow" | "blue" }>
) {
  return (
    <div
      className={`mb-5 border-2 bg-opacity-40 text-slate-400 border-l-8 p-4 ${
        classes[props.color]
      }`}
    >
      {props.children}
    </div>
  );
}
