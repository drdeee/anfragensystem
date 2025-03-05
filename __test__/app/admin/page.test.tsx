import { render, fireEvent, waitFor } from "@testing-library/react";
import AdminPage from "@/app/admin/page";
import { describe, it, expect, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import type { Request } from "@prisma/client";
import { dbClient } from "@/lib/database";

jest.mock("@/lib/database", () => ({
  __esModule: true,
  mockedClient: {
    request: {
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const mockedClient = jest.mocked(dbClient!);

const upcomingEvents: Partial<Request>[] = [
  {
    id: "1",
    dateTime: new Date("2025-01-01T12:00:00.000Z"),
    eventName: "Upcoming Event 1",
    startLocation: "abc",
  },
  {
    id: "2",
    dateTime: new Date("2025-01-02T12:00:00.000Z"),
    eventName: "Upcoming Event 2",
    startLocation: "def",
  },
  {
    id: "3",
    dateTime: new Date("2025-01-03T12:00:00.000Z"),
    eventName: "Upcoming Event 3",
    startLocation: "ghi",
  },
];

const oldEvents = [
  {
    id: "1",
    dateTime: new Date("2022-01-01T12:00:00.000Z"),
    eventName: "Old Event 1",
    startLocation: "abc",
  },
  {
    id: "2",
    dateTime: new Date("2022-01-02T12:00:00.000Z"),
    eventName: "Old Event 2",
    startLocation: "def",
  },
  {
    id: "3",
    dateTime: new Date("2022-01-03T12:00:00.000Z"),
    eventName: "Old Event 3",
    startLocation: "ghi",
  },
];

describe("AdminPage", () => {
  it("fetches upcoming events correctly", async () => {
    mockedClient.request.findMany.mockResolvedValue(upcomingEvents as any);

    const { getByText } = render(<AdminPage />);
    await waitFor(() =>
      expect(getByText("Anstehende Veranstaltungen")).toBeInTheDocument()
    );
    expect(mockedClient.request.findMany).toHaveBeenCalledTimes(1);
    expect(mockedClient.request.findMany).toHaveBeenCalledWith({
      where: { dateTime: { gte: new Date() } },
      orderBy: { dateTime: "asc" },
    });
  });

  it("fetches previous events correctly", async () => {
    mockedClient.request.findMany.mockResolvedValue(oldEvents as any);

    const { getByText } = render(<AdminPage />);
    await waitFor(() =>
      expect(getByText("Vergangene Veranstaltungen")).toBeInTheDocument()
    );
    expect(mockedClient.request.findMany).toHaveBeenCalledTimes(1);
    expect(mockedClient.request.findMany).toHaveBeenCalledWith({
      where: { dateTime: { lt: new Date() } },
      orderBy: { dateTime: "desc" },
    });
  });

  it("deletes an event correctly", async () => {
    const eventId = "1";
    mockedClient.request.delete.mockResolvedValue({} as any);

    const { getByText } = render(<AdminPage />);
    const deleteButton = getByText("Löschen");
    fireEvent.click(deleteButton);
    await waitFor(() =>
      expect(mockedClient.request.delete).toHaveBeenCalledTimes(1)
    );
    expect(mockedClient.request.delete).toHaveBeenCalledWith({
      where: { id: eventId },
    });
  });

  it("renders upcoming and previous events correctly", async () => {
    mockedClient.request.findMany.mockResolvedValueOnce(upcomingEvents as any);
    mockedClient.request.findMany.mockResolvedValueOnce(oldEvents as any);

    const { getByText } = render(<AdminPage />);
    await waitFor(() =>
      expect(getByText("Anstehende Veranstaltungen")).not.toBeNull()
    );
    await waitFor(() =>
      expect(getByText("Vergangene Veranstaltungen")).not.toBeNull()
    );

    expect(getByText("Event 2")).not.toBeNull();
  });

  it("handles empty event lists correctly", async () => {
    mockedClient.request.findMany.mockResolvedValue([]);

    const { queryByText } = render(<AdminPage />);
    await waitFor(() =>
      expect(queryByText("Vergangene Veranstaltungen")).not.toBeInTheDocument()
    );
  });
});
