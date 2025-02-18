import templates from "@/templates";
import { describe, expect, it, jest } from "@jest/globals";
import * as ejs from "ejs";

const request = {
  id: "String",
  createdAt: "DateTime",
  updatedAt: "DateTime",
  contactVerified: "DateTime",

  eventName: "String",
  eventTopic: "String",
  eventOrganizer: "String",
  eventType: "String",

  isStationary: false,

  dateTime: "DateTime",
  expectedEndTime: "String",
  meetingTime: "String",

  startLocation: "String",
  meetingLocation: "String",

  expectedPeople: 1,

  programPo: 1,
  s: ["String", "String"],

  contactName: "String",
  contactPhone: "String",
  contactMail: "String",
  contactTelegram: "String",

  other: "String",

  cardId: 1,
  stackId: 1,
  telegramThreadId: 1,

  formattedDate: "string",
  formattedDateWithYear: "string",
  formattedDateTime: "string",
};

const render = jest.spyOn(ejs, "render");

describe("templates", () => {
  it("should render verification message", () => {
    ejs.render(templates.verificationMessage, {
      request,
      verificationLink: "link",
    });

    expect(render).toHaveReturned();
  });
});
