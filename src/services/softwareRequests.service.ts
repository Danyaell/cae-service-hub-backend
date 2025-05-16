import { DB_ERROR_CODES } from "../constants/errors.const";
import { SOFTWARE_REQUEST, SOFTWARE_REQUESTS } from "../constants/routes.const";
import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient();

export const getAllSoftwareRequestsService = async () => {
    const softwareRequests = await prisma.software_requests.findMany();
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
    const softwareRequest = await prisma.software_requests.create({ data });
    return softwareRequest;

};

export const updateSoftwareRequestService = async (id: number, data: any) => {
    if (!data?.request_date || !data?.requestor_name || !data?.room || !data?.software || !data?.attendant || !data?.commitment_date) {
        throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.INVALID_DATA}`);
    } else if (!(await prisma.software_requests.findUnique({ where: { id } }))) {
        throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    const softwareRequest = await prisma.software_requests.update({ where: { id }, data});
    return softwareRequest;
};

export const deleteSoftwareRequestService = async (id: number) => {
    if (!(await prisma.software_requests.findUnique({ where: { id } }))) {
        throw new Error(`${SOFTWARE_REQUEST}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    const softwareRequest = await prisma.software_requests.delete({ where: { id }});
    return softwareRequest;
};
