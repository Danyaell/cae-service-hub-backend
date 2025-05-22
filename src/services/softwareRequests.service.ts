import { DB_ERROR_CODES } from "../constants/errors.const";
import { SOFTWARE_REQUEST, SOFTWARE_REQUESTS } from "../constants/routes.const";
import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient();

export const getAllSoftwareRequestsService = async () => {
    const softwareRequests = await prisma.software_requests.findMany({
        select: {
            attendant: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                }
            },
            commitment_date: true,
            id: true,
            request_date: true,
            requestor_name: true,
            room: true,
            software: true,
            status: true,
        }
    });
    if (!softwareRequests) {
        throw new Error(`${SOFTWARE_REQUESTS}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    return softwareRequests;

}

export const getSoftwareRequestByIdService = async (id: number) => {
    const softwareRequest = await prisma.software_requests.findUnique({ where: { id } });
    if (!softwareRequest) {
        throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    return softwareRequest;
}

export const createSoftwareRequestService = async (data: any) => {
    if (!data?.request_date || !data?.requestor_name || !data?.room || !data?.software) {
        throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.INVALID_DATA}`);
    }
    const createdSoftwareRequest = await prisma.software_requests.create({ data });
    return createdSoftwareRequest;

};

export const updateSoftwareRequestService = async (id: number, data: any) => {
    if (!data?.request_date || !data?.requestor_name || !data?.room || !data?.software) {
        throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.INVALID_DATA}`);
    } else if (!(await prisma.software_requests.findUnique({ where: { id } }))) {
        throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    const updatedSoftwareRequest = await prisma.software_requests.update({ where: { id }, data });
    return updatedSoftwareRequest;
};

export const deleteSoftwareRequestService = async (id: number) => {
    if (!(await prisma.software_requests.findUnique({ where: { id } }))) {
        throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    const deletedSoftwareRequest = await prisma.software_requests.delete({ where: { id } });
    return deletedSoftwareRequest;
};
