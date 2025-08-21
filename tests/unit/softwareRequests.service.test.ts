import prisma from "../../src/prisma";
import { DB_ERROR_CODES } from "../../src/constants/errors.const";
import {
  createSoftwareRequestService,
  deleteSoftwareRequestService,
  getAllSoftwareRequestsService,
  getSoftwareRequestByIdService,
  updateSoftwareRequestService,
} from "../../src/services/softwareRequests.service";
import { SOFTWARE_REQUEST } from "../../src/constants/routes.const";

describe("Software Requests Service - Database queries", () => {
  let testSoftwareRequestId: number;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await prisma.software_requests.deleteMany({});
  });

  it("should create a request successfully", async () => {
    const data = {
      request_date: new Date(),
      requestor_name: "Ana",
      room: "A204",
      software: "VS Code",
      commitment_date: new Date(),
      status: "pending",
      attendant_id: null,
    };

    const request = await createSoftwareRequestService(data);
    testSoftwareRequestId = request.id;

    expect(request).toHaveProperty("id");
    expect(request.requestor_name).toBe("Ana");
    expect(request.status).toBe("pending");
  });

  it("should return all software requests", async () => {
    await createSoftwareRequestService({
      request_date: new Date(),
      requestor_name: "Ana",
      room: "A204",
      software: "VS Code",
      commitment_date: new Date(),
      status: "pending",
      attendant_id: null,
    });

    const requests = await getAllSoftwareRequestsService();
    expect(requests.length).toBeGreaterThan(0);
    expect(requests[0]).toHaveProperty("requestor_name");
  });

  it("should get software request by id", async () => {
    const request = await getSoftwareRequestByIdService(testSoftwareRequestId);
    expect(request.id).toBe(testSoftwareRequestId);
  });

  it("should throw error if request not found by id", async () => {
    await expect(getSoftwareRequestByIdService(9999)).rejects.toThrow(
      `${SOFTWARE_REQUEST}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should update a request successfully", async () => {
    const updatedData = {
      request_date: new Date(),
      requestor_name: "Anabelle",
      room: "A203",
      software: "VS Code",
      commitment_date: new Date(),
      status: "completed",
      attendant_id: null,
    };

    const updated = await updateSoftwareRequestService(
      testSoftwareRequestId,
      updatedData
    );
    expect(updated.requestor_name).toBe("Anabelle");
    expect(updated.status).toBe("completed");
  });

  it("should throw error if updating non-existent request", async () => {
    const data = {
      request_date: new Date(),
      requestor_name: "Anabelle",
      room: "A203",
      software: "VS Code",
      commitment_date: new Date(),
      status: "completed",
      attendant_id: null,
    };

    await expect(updateSoftwareRequestService(9999, data)).rejects.toThrow(
      `${SOFTWARE_REQUEST}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should delete a request successfully", async () => {
    const deleted = await deleteSoftwareRequestService(testSoftwareRequestId);
    expect(deleted.id).toBe(testSoftwareRequestId);

    await expect(
      getSoftwareRequestByIdService(testSoftwareRequestId)
    ).rejects.toThrow(
      `${SOFTWARE_REQUEST}_${testSoftwareRequestId}_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should throw error if deleting non-existent request", async () => {
    await expect(deleteSoftwareRequestService(9999)).rejects.toThrow(
      `${SOFTWARE_REQUEST}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });
});
