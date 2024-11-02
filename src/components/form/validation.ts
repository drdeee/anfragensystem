import z from "zod";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export function emptyToNull(arg: unknown) {
  if (typeof arg !== "string") {
    return arg;
  }
  if (arg.trim() === "") {
    return null;
  }
  return arg;
}

const formData = z.object({
  eventName: z.string().min(3),
  eventTopic: z.string().min(3),
  eventOrganizer: z.string().min(1),
  eventType: z.string(),

  isStationary: z.boolean(),

  dateTime: z.coerce.date(),
  expectedEndTime: z.string().min(3),
  meetingTime: z.string().optional().nullish(),

  startLocation: z.string().min(3),
  meetingLocation: z.string().optional().nullish(),

  expectedPeople: z.coerce.number().int().positive(),

  programPoints: z.array(z.string()),

  contactName: z.string(),
  contactPhone: z.string().refine((input) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parse(input, "DE"));
    } catch {
      return false;
    }
  }),
  contactMail: z.string().email("Ungültige Mailadresse").optional().nullish(),
  contactTelegram: z.string().min(5).optional().nullish(),
  other: z.string().optional().nullish(),
});

export const validators = {
  all: z.preprocess(emptyToNull, formData),
  general: z.preprocess(
    emptyToNull,
    formData.pick({
      eventName: true,
      eventTopic: true,
      eventOrganizer: true,
      eventType: true,
      expectedPeople: true,
    })
  ),
  process: z.preprocess(
    emptyToNull,
    formData.pick({
      dateTime: true,
      startLocation: true,
      expectedEndTime: true,
      isStationary: true,
      meetingLocation: true,
    })
  ),
  program: z.preprocess(
    emptyToNull,
    formData.pick({
      programPoints: true,
    })
  ),
  other: z
    .preprocess(
      emptyToNull,
      formData.pick({
        contactName: true,
        contactPhone: true,
        contactMail: true,
        contactTelegram: true,
        other: true,
      })
    )
    .refine(
      (data) => !!data.contactMail || !!data.contactTelegram,
      "Du musst entweder eine Mailadresse oder einen Telegram-Username angeben."
    ),
};
