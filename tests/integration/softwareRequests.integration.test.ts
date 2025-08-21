import request from "supertest";
import prisma from "../../src/prisma";
import { DB_ERROR_CODES } from "../../src/constants/errors.const";
import { app } from "../../src/app";
import { A203 } from "../../src/constants/common.const";

describe("Software Requests API Integration", () => {
  let testRequestId: number;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.software_requests.deleteMany({});
    await prisma.$disconnect();
  });

  it("POST /api/software-requests - should create a software request", async () => {
    const data = {
      request_date: new Date(),
      requestor_name: "Carlos",
      room: A203,
      software: "Photoshop",
      attendant: null,
      commitment_date: new Date(),
      status: "pending",
    };

    const res = await request(app).post("/api/software-requests").send(data);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    testRequestId = res.body.id;
  });

  it("GET /api/software-requests - should return all software requests", async () => {
    const res = await request(app).get("/api/software-requests");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("requestor_name");
  });

  it("GET /api/software-requests/:id - should return a request by id", async () => {
    const res = await request(app).get(`/api/software-requests/${testRequestId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(testRequestId);
  });

  it("GET /api/software-requests/:id - should return 404 if request does not exist", async () => {
    const res = await request(app).get(`/api/software-requests/9999`);
    expect(res.status).toBe(404);
    expect(res.body.error).toContain(DB_ERROR_CODES.NOT_FOUND);
  });

  it("PUT /api/software-requests/:id - should update a request", async () => {
    const updatedData = {
      request_date: new Date(),
      requestor_name: "Carlos Updated",
      room: A203,
      software: "Illustrator",
      attendant: null,
      commitment_date: new Date(),
      status: "completed",
    };

    const res = await request(app)
      .put(`/api/software-requests/${testRequestId}`)
      .send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.requestor_name).toBe("Carlos Updated");
  });

  it("PUT /api/software-requests/:id - should return 404 if updating non-existent request", async () => {
    const data = {
      request_date: new Date(),
      requestor_name: "Fake",
      room: A203,
      software: "Nothing",
      attendant: null,
      commitment_date: new Date(),
      status: "pending",
    };

    const res = await request(app).put("/api/software-requests/9999").send(data);
    expect(res.status).toBe(404);
  });

  it("DELETE /api/software-requests/:id - should delete a request", async () => {
    const res = await request(app).delete(`/api/software-requests/${testRequestId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(testRequestId);
  });

  it("DELETE /api/software-requests/:id - should return 404 if deleting non-existent request", async () => {
    const res = await request(app).delete(`/api/software-requests/9999`);
    expect(res.status).toBe(404);
  });
});
