import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient();

export const getAllSoftwareRequestsService = async () => {
    try {
        const softwareRequests = await prisma.software_requests.findMany();
        return softwareRequests;
    } catch (error) {
        return { error: "Error fetching software requests", description: error};
    } finally {
        await prisma.$disconnect();
    }
}

export const getSoftwareRequestService = async (id: number) => {
    try {
        const softwareRequest = await prisma.software_requests.findUnique({
            where: { id },
        });
        return softwareRequest;
    } catch (error) {
        return { error: "Error fetching software request", description: error };
    } finally {
        await prisma.$disconnect();
    }
}
export const createSoftwareRequestService = async (data: any) => {    
    try {
        const softwareRequest = await prisma.software_requests.create({data,});
        return softwareRequest;
    } catch (error) {
        return { error: "Error creating software request", description: error };
    } finally {
        await prisma.$disconnect();
    }
};

export const updateSoftwareRequestService = async (id: number, data: any) => {
    try {
        const softwareRequest = await prisma.software_requests.update({
            where: { id },
            data,
        });
        return softwareRequest;
    } catch (error) {
        console.log(error);
        return { error: "Error updating software request", description: error };
    } finally {
        await prisma.$disconnect();
    }
};

export const deleteSoftwareRequestService = async (id: number) => {
    try {
        const softwareRequest = await prisma.software_requests.delete({
            where: { id },
        });
        return softwareRequest;
    } catch (error) {
        return { error: "Error deleting software request", description: error };
    } finally {
        await prisma.$disconnect();
    }
};
