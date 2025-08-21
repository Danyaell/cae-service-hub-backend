import request from "supertest";
import { app } from "../../src/app";
import prisma from "../../src/prisma";
import { A203 } from "../../src/constants/common.const";

describe("Reports API Integration", () => {
  let testReportId: number;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.reports.deleteMany({});
    await prisma.$disconnect();
  });

  // Crear un reporte
  it("POST /api/reports - should create a report", async () => {
    const data = {
      report_date: new Date(),
      reporter_name: "Ana",
      role: "Estudiante",
      room: A203,
      pc: "01",
      description: "No enciende",
      attendant: null,
      action_taken: "Revisar PSU",
      status: "pending",
    };

    const res = await request(app).post("/api/reports").send(data);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    testReportId = res.body.id;
  });

  // Obtener todos los reportes
  it("GET /api/reports - should return all reports", async () => {
    const res = await request(app).get("/api/reports");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("reporter_name");
  });

  // Obtener reporte por ID
  it("GET /api/reports/:id - should return report by id", async () => {
    const res = await request(app).get(`/api/reports/${testReportId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(testReportId);
  });

  it("GET /api/reports/:id - should return 404 for non-existent report", async () => {
    const res = await request(app).get("/api/reports/9999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  // Actualizar reporte
  it("PUT /api/reports/:id - should update a report", async () => {
    const updatedData = {
      report_date: new Date(),
      reporter_name: "Ana Updated",
      role: "Estudiante",
      room: A203,
      pc: "01",
      description: "No enciende",
      attendant: null,
      action_taken: "Revisar PSU",
      status: "completed",
    };

    const res = await request(app).put(`/api/reports/${testReportId}`).send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.reporter_name).toBe("Ana Updated");
    expect(res.body.status).toBe("completed");
  });

  it("PUT /api/reports/:id - should return 404 for non-existent report", async () => {
    const res = await request(app).put("/api/reports/9999").send({
      report_date: new Date(),
      reporter_name: "Fake",
      role: "Estudiante",
      room: A203,
      pc: "01",
      description: "Test",
      attendant: null,
      action_taken: "Nothing",
      status: "pending",
    });
    expect(res.status).toBe(404);
  });

  // Eliminar reporte
  it("DELETE /api/reports/:id - should delete a report", async () => {
    const res = await request(app).delete(`/api/reports/${testReportId}`);
    expect(res.status).toBe(200);
  });

  it("DELETE /api/reports/:id - should return 404 for non-existent report", async () => {
    const res = await request(app).delete("/api/reports/9999");
    expect(res.status).toBe(404);
  });
});
