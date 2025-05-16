import { A203 } from "../constants/common.const";
import { CONTROLLER_ERROR_CODES, DB_ERROR_CODES } from "../constants/errors.const";
import { REPORT } from "../constants/routes.const";
import { $Enums } from "../generated/prisma";
import { createReportService, deleteReportService, getAllReportsService, getReportByIdService, updateReportService } from "../services/reports.service";

export const getAllReports = async (_req: any, res: any) => {
    try {
        const reportsResponse = await getAllReportsService();
        res.status(200).send(reportsResponse);
    } catch (error: any) {
        res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    }
};

export const getReportById = async (req: any, res: any) => {
    try {
        const id = parseInt(req?.params?.id);
        const reportResponse = await getReportByIdService(id);
        res.status(200).send(reportResponse);
    } catch (error: any) {
        if (error?.message === `${REPORT}_${DB_ERROR_CODES.NOT_FOUND}`) {
            res.status(404).send({
                error: `${REPORT}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`
            });
        } else {
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};

export const createReport = async (req: any, res: any) => {
    try {
        const requestBody = {
            report_date: new Date(req?.body?.report_date),
            reporter_name: req?.body?.reporter_name,
            role: req?.body?.role,
            room: req?.body?.room === A203 ? $Enums.reports_room.A203 : $Enums.reports_room.A204,
            pc: req?.body?.pc,
            description: req?.body?.description,
            attendant: req?.body?.attendant,
            action_taken: req?.body?.action_taken,
        }
        const createReportResponse = await createReportService(requestBody);
        res.status(201).send(createReportResponse);
    } catch (error: any) {
        if (error?.message === `${REPORT}_${DB_ERROR_CODES.INVALID_DATA}`) {
            res.status(422).send({ error: `${REPORT}_${CONTROLLER_ERROR_CODES.MISSING_DATA.message}` });
        } else {
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};

export const updateReport = async (req: any, res: any) => {
    try {
        const id = parseInt(req?.params?.id);
        const requestBody = {
            report_date: new Date(req?.body?.report_date),
            reporter_name: req?.body?.reporter_name,
            role: req?.body?.role,
            room: req?.body?.room === A203 ? $Enums.reports_room.A203 : $Enums.reports_room.A204,
            pc: req?.body?.pc,
            description: req?.body?.description,
            attendant: req?.body?.attendant,
            action_taken: req?.body?.action_taken,
        }
        const updateReportResponse = await updateReportService(id, requestBody);
        res.status(200).send(updateReportResponse);
    } catch (error: any) {
        if (error?.message === `${REPORT}_${DB_ERROR_CODES.INVALID_DATA}`) {
            res.status(422).send({ error: `${REPORT}_${CONTROLLER_ERROR_CODES.MISSING_DATA.message}` });
        } else if (error?.message === `${REPORT}_${DB_ERROR_CODES.NOT_FOUND}`) {
            res.status(404).send({
                error: `${REPORT}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`
            });
        } else {
            console.log(error);
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};

export const deleteReport = async (req: any, res: any) => {
    try {
        const id = parseInt(req?.params?.id);
        const deleteReportResponse = await deleteReportService(id);
        res.status(200).send(deleteReportResponse);
    } catch (error: any) {
        if (error?.message === `${REPORT}_${DB_ERROR_CODES.NOT_FOUND}`) {
            res.status(404).send({
                error: `${REPORT}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`
            });
        } else {
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};
