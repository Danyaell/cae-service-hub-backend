import { $Enums } from "../generated/prisma";
import { createSoftwareRequestService, deleteSoftwareRequestService, getAllSoftwareRequestsService, getSoftwareRequestService, updateSoftwareRequestService } from "../services/softwareRequests.service";

export const getAllSoftwareRequests = async (_req: any, res: any) => {
    res.send(await getAllSoftwareRequestsService().then((data) => {
        return data;
    }));
};

export const getSoftwareRequest = async (req: any, res: any) => {
    const id = parseInt(req.params.id);
    res.send(await getSoftwareRequestService(id).then((data) => {
        return data;
    }));
};

export const createSoftwareRequest = async (req: any, res: any) => {
    const requestBody = {
        request_date: new Date(req.body.request_date),
        requestor_name: req.body.requestor_name,
        room: req.body.room === '203' ? $Enums.software_requests_room.A203 : $Enums.software_requests_room.A204,
        software: req.body.software,
        attendant: req.body.attendant,
        commitment_date: new Date(req.body.commitment_date),
    }
    res.send(await createSoftwareRequestService(requestBody).then((data) => {
        return data;
    }));
};

export const updateSoftwareRequest = async (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const requestBody = {
        request_date: new Date(req.body.request_date),
        requestor_name: req.body.requestor_name,
        room: req.body.room === '203' ? $Enums.software_requests_room.A203 : $Enums.software_requests_room.A204,
        software: req.body.software,
        attendant: req.body.attendant,
        commitment_date: new Date(req.body.commitment_date),
    }
    res.send(await updateSoftwareRequestService(id, requestBody));
};

export const deleteSoftwareRequest = async (_req: any, res: any) => {
    const id = parseInt(_req.params.id);
    res.send(await deleteSoftwareRequestService(id).then((data) => {
        return data;
    }));
};
