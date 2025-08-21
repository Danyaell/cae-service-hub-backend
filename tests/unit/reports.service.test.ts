import prisma from "../../src/prisma";
import { createReportService } from "../../src/services/reports.service";

describe("Reports Service", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a new report", async () => {
    const newReport = await createReportService({
      reporter: "Alice",
      role: "Student",
      room: "Lab A",
      pc: "PC-01",
      description: "Does not turn on",
      attendant: "Tech Bob",
      actionTaken: "Changed PSU",
    });

    expect(newReport).toHaveProperty("id");
    expect(newReport.reporter_name).toBe("Alice");
  });
});
