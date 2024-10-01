import { PropsWithChildren } from "react";

import logo from "@/media/logo.png";
import Image from "next/image";

export default function Page({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="pt-8">
      <Image
        src={logo}
        width={200}
        alt="Lautis Dresden Logo"
        className="mx-auto mb-8"
      />
      <div className="w-1/3 mx-auto bg-slate-950 bg-opacity-70 p-8 backdrop-blur border-slate-950 border-2 rounded-2xl">
        <h1 className="text-4xl font-bold mb-5 text-white">{title}</h1>

        <div className="text-slate-400">{children}</div>
      </div>
    </div>
  );
}
