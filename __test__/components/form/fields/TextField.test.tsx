import { it, jest, expect, beforeEach, describe } from "@jest/globals";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TextField from "@/components/form/fields/TextField";
import { format } from "date-fns";

describe("components/form/field/TextField", () => {
  const key = "eventName";
  const callback = jest.fn((data: { [key: string]: any }) => {
    return data;
  });

  beforeEach(() => {
    callback.mockClear();
  });

  it('should return null instead of ""', async () => {
    render(
      <TextField
        dataKey="meetingLocation"
        value="1"
        label="Test"
        callback={callback}
      />
    );
    callback.mockClear();
    await userEvent.click(screen.getByLabelText("input"));
    await userEvent.keyboard("[Backspace]");

    expect(callback).toHaveReturnedTimes(1);
    expect(callback).toHaveReturnedWith({
      meetingLocation: null,
    });
  });

  it("should create a textarea if area=true", () => {
    render(<TextField area dataKey="other" label="Test" callback={callback} />);
    callback.mockClear();
    expect(screen.getByLabelText("input").tagName).toBe("TEXTAREA");
  });

  it("should have red borders if the value is not valid", async () => {
    const tryField = async (area: boolean) => {
      cleanup();
      render(
        <TextField
          area={area}
          dataKey="expectedPeople"
          label="Test"
          callback={callback}
        />
      );

      await userEvent.click(screen.getByLabelText("input"));
      await userEvent.keyboard("l");
      expect(screen.getByLabelText("input").className).toEqual(
        expect.stringContaining(
          "border-red-700 focus-visible:ring-red-700 focus:ring-red-700"
        )
      );

      await userEvent.keyboard("1");
      expect(screen.getByLabelText("input").className).toEqual(
        expect.not.stringContaining(
          "border-red-700 focus-visible:ring-red-700 focus:ring-red-700"
        )
      );
    };

    await tryField(true);
    await tryField(false);
  });

  it("should format a date into an input compatible format", async () => {
    const date = new Date();
    render(
      <TextField
        dataKey="dateTime"
        datetime
        label="Test"
        value={date}
        callback={callback}
      />
    );
    const value = (screen.getByLabelText("input") as HTMLInputElement).value;
    expect(typeof value).toBe("string");
    expect(value).toBe(format(date, "y-LL-dd'T'HH:mm"));
  });

  it("should choose the input type depending on datetime & time props", () => {
    const tryInput = (
      input: { datetime?: boolean; time?: boolean },
      expectedType: string
    ) => {
      cleanup();
      render(
        <TextField
          {...input}
          label="Test"
          dataKey="other"
          callback={callback}
        />
      );
      expect((screen.getByLabelText("input") as HTMLInputElement).type).toBe(
        expectedType
      );
    };
    tryInput({ time: true }, "time");
    tryInput({ datetime: true }, "datetime-local");
  });

  it("should transform an empty value prop to an empty string", () => {
    const tryValue = (value: any, expectedValue: string) => {
      cleanup();
      render(
        <TextField
          area
          dataKey="dateTime"
          datetime
          label="Test"
          value={value}
          callback={callback}
        />
      );
      expect((screen.getByLabelText("input") as HTMLInputElement).value).toBe(
        expectedValue
      );
    };

    tryValue(null, "");
    tryValue("test", "test");
  });
});
