/**
 * @jest-environment node
 */

import { middleware } from "@/middleware";
import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { NextResponse, NextRequest } from "next/server";

describe("middleware", () => {
  beforeAll(() => {
    process.env.ADMIN_USER = "admin";
    process.env.ADMIN_PASSWORD = "password";
  });

  const json = jest.spyOn(NextResponse, "json");
  const next = jest.spyOn(NextResponse, "next");

  it("should return 401 when wrong credentials are provided ", async () => {
    const tryCredentials = async (
      title: string,
      value: string,
      fail?: boolean
    ) => {
      const headers = new Headers();
      headers.set(title, value);
      await middleware(
        new NextRequest("https://localhost:3000/admin", {
          headers,
        })
      );
      expect(fail ? json : next).toBeCalled();
    };

    await tryCredentials(
      "Authorization",
      `Basic ${Buffer.from(`admin:password`, "utf-8").toString("base64")}`,
      false
    );
    await tryCredentials(
      "Authorization",
      `Basic ${Buffer.from(`wronguser:password`, "utf-8").toString("base64")}`,
      true
    );
    await tryCredentials(
      "Authorization",
      `Basic ${Buffer.from(`admin:wrongpassword`, "utf-8").toString("base64")}`,
      true
    );
    await tryCredentials(
      "Authorization",
      `Basic ${Buffer.from(`wronguser:wrongpassword`, "utf-8").toString(
        "base64"
      )}`,
      true
    );
    await tryCredentials(
      "Content-Type",
      `Basic ${Buffer.from(`wronguser:password`, "utf-8").toString("base64")}`,
      true
    );
  });
});
