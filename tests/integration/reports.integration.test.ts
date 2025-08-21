import request from "supertest";
import { app } from "../../src/index";
import prisma from "../../src/prisma";

describe("Reports API", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("POST /reports should create a report", async () => {
    const res = await request(app)
      .post("/reports")
      .send({
        reporter: "Alice",
        role: "Student",
        room: "Lab A",
        pc: "PC-01",
        description: "Does not turn on",
        attendant: "Tech Bob",
        actionTaken: "Changed PSU",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.reporter).toBe("Alice");
  });
});
