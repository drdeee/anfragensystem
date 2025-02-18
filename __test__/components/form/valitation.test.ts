import { emptyToNull, fieldValidators } from "@/components/form/validation";
import { it, expect } from "@jest/globals";
import { describe } from "node:test";

describe("components/form/validation", () => {
  it("should return null if empty", () => {
    expect(emptyToNull("")).toBeNull();
    expect(emptyToNull(undefined)).toBeUndefined();
    expect(emptyToNull(0)).toBe(0);
    expect(emptyToNull("test   ")).toBe("test   ");
  });

  it("should succeed with valid phone number", () => {
    const phone = fieldValidators.contactPhone;
    expect(phone.safeParse("015222482734").success).toBeTruthy();
    expect(phone.safeParse("+49 15222482734").success).toBeTruthy();
    expect(phone.safeParse("test").success).toBeFalsy();
  });

  it("should validate telegram usernames", () => {
    const tg = fieldValidators.contactTelegram;

    const result = tg.safeParse("@nobody");
    expect(result.success).toBeTruthy();
    expect(result.data).toBe("nobody");

    expect(tg.safeParse("nad").success).toBeFalsy();
  });
});
