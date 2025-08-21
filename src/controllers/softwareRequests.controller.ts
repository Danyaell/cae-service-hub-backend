import { A203 } from "../constants/common.const";
import { CONTROLLER_ERROR_CODES, DB_ERROR_CODES } from "../constants/errors.const";
import { SOFTWARE_REQUEST } from "../constants/routes.const";
import { $Enums } from "../generated/prisma";
import { createSoftwareRequestService, deleteSoftwareRequestService, getAllSoftwareRequestsService, getSoftwareRequestByIdService, updateSoftwareRequestService } from "../services/softwareRequests.service";

export const getAllSoftwareRequests = async (_req: any, res: any) => {
    try {
        const softwareRequestsResponse = await getAllSoftwareRequestsService();
        res.status(200).send(softwareRequestsResponse);
    } catch (error: any) {
        res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    }
};

export const getSoftwareRequestById = async (req: any, res: any) => {
    let id;
    try {
        id = parseInt(req?.params?.id);
        const SoftwareRequestResponse = await getSoftwareRequestByIdService(id);
        res.status(200).send(SoftwareRequestResponse);
    } catch (error: any) {
        if (error?.message === `${SOFTWARE_REQUEST}_${id}_${DB_ERROR_CODES.NOT_FOUND}`) {
            res.status(404).send({
                error: `${SOFTWARE_REQUEST}_${id}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`
            });
        } else {
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};

export const createSoftwareRequest = async (req: any, res: any) => {
    try {
        const requestBody = {
            request_date: new Date(req?.body?.request_date),
            requestor_name: req?.body?.requestor_name,
            room: req?.body?.room === A203 ? $Enums.software_requests_room.A203 : $Enums.software_requests_room.A204,
            software: req?.body?.software,
            attendant_id: req?.body?.attendant,
            commitment_date: req?.body?.commitment_date ? new Date(req?.body?.commitment_date) : null,
            status: req?.body?.status,
        }
        const createSoftwareRequestResponse = await createSoftwareRequestService(requestBody);
        res.status(201).send(createSoftwareRequestResponse);
    } catch (error: any) {
        if (error?.message === `${SOFTWARE_REQUEST}_${DB_ERROR_CODES.INVALID_DATA}`) {
            res.status(422).send({ error: `${SOFTWARE_REQUEST}_${CONTROLLER_ERROR_CODES.MISSING_DATA.message}` });
        } else {
            console.log(error);
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};

export const updateSoftwareRequest = async (req: any, res: any) => {
    let id;
    try {
        id = parseInt(req?.params?.id);
        const requestBody = {
            request_date: new Date(req?.body?.request_date),
            requestor_name: req?.body?.requestor_name,
            room: req?.body?.room === A203 ? $Enums.software_requests_room.A203 : $Enums.software_requests_room.A204,
            software: req?.body?.software,
            attendant_id: req?.body?.attendant,
            commitment_date: req?.body?.commitment_date ? new Date(req?.body?.commitment_date) : null,
            status: req?.body?.status,
        }
        const updateSoftwareRequestResponse = await updateSoftwareRequestService(id, requestBody);
        res.status(200).send(updateSoftwareRequestResponse);
    } catch (error: any) {
        if (error?.message === `${SOFTWARE_REQUEST}_${DB_ERROR_CODES.INVALID_DATA}`) {
            res.status(422).send({ error: `${SOFTWARE_REQUEST}_${CONTROLLER_ERROR_CODES.MISSING_DATA.message}` });
        } else if (error?.message === `${SOFTWARE_REQUEST}_${id}_${DB_ERROR_CODES.NOT_FOUND}`) {
            res.status(404).send({
                error: `${SOFTWARE_REQUEST}_${id}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`
            });
        } else {
            console.log(error);
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};

export const deleteSoftwareRequest = async (req: any, res: any) => {
    let id;
    try {
        id = parseInt(req?.params?.id);
        const deleteSoftwareRequestResponse = await deleteSoftwareRequestService(id);
        res.status(200).send(deleteSoftwareRequestResponse);
    } catch (error: any) {
        if (error?.message === `${SOFTWARE_REQUEST}_${id}_${DB_ERROR_CODES.NOT_FOUND}`) {
            res.status(404).send({
                error: `${SOFTWARE_REQUEST}_${id}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`
            });
        } else {
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};
