import { DB_ERROR_CODES } from "../constants/errors.const";
import { SOFTWARE_REQUEST, SOFTWARE_REQUESTS } from "../constants/routes.const";
import prisma from "../prisma";

/**
 * Retrieves all software requests from the database.
 */
export const getAllSoftwareRequestsService = async () => {
  const softwareRequests = await prisma.software_requests.findMany({
    select: {
      attendant: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
      commitment_date: true,
      id: true,
      request_date: true,
      requestor_name: true,
      room: true,
      software: true,
      status: true,
    },
  });
  if (!softwareRequests) {
    throw new Error(`${SOFTWARE_REQUESTS}_${DB_ERROR_CODES.NOT_FOUND}`);
  }
  return softwareRequests;
};

/**
 * Retrieves a single software request by ID.
 * @param id - The ID of the software request to retrieve.
 */
export const getSoftwareRequestByIdService = async (id: number) => {
  const softwareRequest = await prisma.software_requests.findUnique({
    where: { id },
  });
  if (!id || !softwareRequest) {
    throw new Error(`${SOFTWARE_REQUEST}_${id}_${DB_ERROR_CODES.NOT_FOUND}`);
  }
  return softwareRequest;
};

/**
 * Creates a new software request.
 * @param data - The data for the new software request.
 */
export const createSoftwareRequestService = async (data: any) => {
  if (
    !data?.request_date ||
    !data?.requestor_name ||
    !data?.room ||
    !data?.software
  ) {
    throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.INVALID_DATA}`);
  }
  const createdSoftwareRequest = await prisma.software_requests.create({
    data,
  });
  return createdSoftwareRequest;
};

/**
 * Updates a software request by ID.
 * @param id - The ID of the software request to update.
 * @param data - The updated software request data.
 */
export const updateSoftwareRequestService = async (id: number, data: any) => {
  if (
    !data?.request_date ||
    !data?.requestor_name ||
    !data?.room ||
    !data?.software
  ) {
    throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.INVALID_DATA}`);
  } else if (
    !id ||
    !(await prisma.software_requests.findUnique({ where: { id } }))
  ) {
    throw new Error(`${SOFTWARE_REQUEST}_${id}_${DB_ERROR_CODES.NOT_FOUND}`);
  }
  const updatedSoftwareRequest = await prisma.software_requests.update({
    where: { id },
    data,
  });
  return updatedSoftwareRequest;
};

/**
 * Deletes a software request by ID.
 * @param id - The ID of the software request to delete.
 */
export const deleteSoftwareRequestService = async (id: number) => {
  if (!id || !(await prisma.software_requests.findUnique({ where: { id } }))) {
    throw new Error(`${SOFTWARE_REQUEST}_${id}_${DB_ERROR_CODES.NOT_FOUND}`);
  }
  const deletedSoftwareRequest = await prisma.software_requests.delete({
    where: { id },
  });
  return deletedSoftwareRequest;
};
