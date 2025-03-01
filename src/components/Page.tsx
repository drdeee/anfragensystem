import { PropsWithChildren } from "react";

import logo from "@/media/logo.png";
import Image from "next/image";
import { Card } from "./ui/card";

export default function Page({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="py-8 p-2">
      <Image
        src={logo}
        width={200}
        alt="Lautis Dresden Logo"
        className="mx-auto mb-8"
      />
      <Card className="xl:w-2/5 2xl:w-1/3 sm:w-3/4 md:w-2/3 w-full mx-auto p-8">
        <h1 className="text-4xl font-bold mb-5 text-white rounded-2xl">
          {title}
        </h1>

        <div className="text-slate-400">{children}</div>
      </Card>
    </div>
  );
}
