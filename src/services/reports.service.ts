import { DB_ERROR_CODES } from "../constants/errors.const";
import { REPORT, REPORTS } from "../constants/routes.const";
import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient();

export const getAllReportsService = async () => {
    const reports = await prisma.reports.findMany({
        select: {
            attendant: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                }
            },
            action_taken: true,
            id: true,
            report_date: true,
            reporter_name: true,
            role: true,
            room: true,
            pc: true,
            description: true,
            status: true,
        }
    });
    if (!reports) {
        throw new Error(`${REPORTS}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    return reports;

}

export const getReportByIdService = async (id: number) => {
    const report = await prisma.reports.findUnique({ where: { id } });
    if (!report) {
        throw new Error(`${REPORT}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    return report;
}

export const createReportService = async (data: any) => {
    if (!data?.report_date || !data?.room || !data?.pc || !data?.description) {
        throw new Error(`${REPORT}_${DB_ERROR_CODES.INVALID_DATA}`);
    }
    const createdReport = await prisma.reports.create({ data });
    return createdReport;

};

export const updateReportService = async (id: number, data: any) => {
    if (!data?.report_date || !data?.reporter_name || !data?.room || !data?.pc || !data?.description) {
        throw new Error(`${REPORT}_${DB_ERROR_CODES.INVALID_DATA}`);
    } else if (!(await prisma.reports.findUnique({ where: { id } }))) {
        throw new Error(`${REPORT}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    const updatedReport = await prisma.reports.update({ where: { id }, data });
    return updatedReport;
};

export const deleteReportService = async (id: number) => {
    if (!(await prisma.reports.findUnique({ where: { id } }))) {
        throw new Error(`${REPORT}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    const deletedReport = await prisma.reports.delete({ where: { id } });
    return deletedReport;
};
