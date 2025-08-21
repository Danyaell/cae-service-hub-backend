import prisma from "../../src/prisma";
import {
  getAllReportsService,
  getReportByIdService,
  createReportService,
  updateReportService,
  deleteReportService,
} from "../../src/services/reports.service";
import { REPORT } from "../../src/constants/routes.const";
import { DB_ERROR_CODES } from "../../src/constants/errors.const";

describe("Reports Service", () => {
  let testReportId: number;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await prisma.reports.deleteMany({});
  });

  // Crear un reporte
  it("should create a report successfully", async () => {
    const data = {
      report_date: new Date(),
      reporter_name: "Juan",
      role: "Estudiante",
      room: "A203",
      pc: "01",
      description: "No enciende",
      attendant_id: null,
      action_taken: "Revisar PSU",
      status: "pending",
    };

    const report = await createReportService(data);
    testReportId = report.id;

    expect(report).toHaveProperty("id");
    expect(report.reporter_name).toBe("Juan");
    expect(report.status).toBe("pending");
  });

  // Obtener todos los reportes
  it("should return all reports", async () => {
    await createReportService({
      report_date: new Date(),
      reporter_name: "Ana",
      role: "Estudiante",
      room: "A204",
      pc: "02",
      description: "Pantalla rota",
      attendant_id: null,
      action_taken: "Cambiar monitor",
      status: "pending",
    });

    const reports = await getAllReportsService();
    expect(reports.length).toBeGreaterThan(0);
    expect(reports[0]).toHaveProperty("reporter_name");
  });

  // Obtener reporte por id
  it("should get report by id", async () => {
    const report = await getReportByIdService(testReportId);
    expect(report.id).toBe(testReportId);
  });

  it("should throw error if report not found by id", async () => {
    await expect(getReportByIdService(9999)).rejects.toThrow(
      `${REPORT}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  // Actualizar reporte
  it("should update a report successfully", async () => {
    const updatedData = {
      report_date: new Date(),
      reporter_name: "Juan Updated",
      role: "Estudiante",
      room: "A203",
      pc: "01",
      description: "No enciende",
      attendant_id: null,
      action_taken: "Revisar PSU",
      status: "completed",
    };

    const updated = await updateReportService(testReportId, updatedData);
    expect(updated.reporter_name).toBe("Juan Updated");
    expect(updated.status).toBe("completed");
  });

  it("should throw error if updating non-existent report", async () => {
    const data = {
      report_date: new Date(),
      reporter_name: "Fake",
      role: "Estudiante",
      room: "A203",
      pc: "01",
      description: "Test",
      attendant_id: null,
      action_taken: "Nothing",
      status: "pending",
    };

    await expect(updateReportService(9999, data)).rejects.toThrow(
      `${REPORT}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  // Eliminar reporte
  it("should delete a report successfully", async () => {
    const deleted = await deleteReportService(testReportId);
    expect(deleted.id).toBe(testReportId);

    await expect(getReportByIdService(testReportId)).rejects.toThrow(
      `${REPORT}_${testReportId}_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should throw error if deleting non-existent report", async () => {
    await expect(deleteReportService(9999)).rejects.toThrow(
      `${REPORT}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });
});
