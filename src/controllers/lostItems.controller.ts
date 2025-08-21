import { A203 } from "../constants/common.const";
import { CONTROLLER_ERROR_CODES, DB_ERROR_CODES } from "../constants/errors.const";
import { LOST_ITEM } from "../constants/routes.const";
import { $Enums } from "../generated/prisma";
import { createLostItemService, deleteLostItemService, getAllLostItemsService, getLostItemsByIdService, updateLostItemService } from "../services/lostItems.service";

export const getAllLostItems = async (_req: any, res: any) => {
    try {
        const lostItemsResponse = await getAllLostItemsService();
        res.status(200).send(lostItemsResponse);
    } catch (error: any) {
        res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
    }
};

export const getLostItemById = async (req: any, res: any) => {
    let id;
    try {
        id = parseInt(req?.params?.id);
        const lostItemResponse = await getLostItemsByIdService(id);
        res.status(200).send(lostItemResponse);
    } catch (error: any) {
        if (error?.message === `${LOST_ITEM}_${id}_${DB_ERROR_CODES.NOT_FOUND}`) {
            res.status(404).send({
                error: `${LOST_ITEM}_${id}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`
            });
        } else {
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};

export const createLostItem = async (req: any, res: any) => {
    try {
        const requestBody = {
            date: new Date(req?.body?.date),
            room: req?.body?.room === A203 ? $Enums.lost_items_room.A203 : $Enums.lost_items_room.A204,
            description: req?.body?.description,
            returned: JSON.parse(req?.body?.returned || 'false'),
        }
        const createLostItemResponse = await createLostItemService(requestBody);
        res.status(201).send(createLostItemResponse);
    } catch (error: any) {
        if (error?.message === `${LOST_ITEM}_${DB_ERROR_CODES.INVALID_DATA}`) {
            res.status(422).send({ error: `${LOST_ITEM}_${CONTROLLER_ERROR_CODES.MISSING_DATA.message}` });
        } else {
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};

export const updateLostItem = async (req: any, res: any) => {
    let id;
    try {
        id = parseInt(req?.params?.id);
        const requestBody = {
            date: new Date(req?.body?.date),
            room: req?.body?.room === A203 ? $Enums.lost_items_room.A203 : $Enums.lost_items_room.A204,
            description: req?.body?.description,
            returned: JSON.parse(req?.body?.returned || 'false'),
        }
        const updateLostItemResponse = await updateLostItemService(id, requestBody);
        res.status(200).send(updateLostItemResponse);
    } catch (error: any) {
        if (error?.message === `${LOST_ITEM}_${DB_ERROR_CODES.INVALID_DATA}`) {
            res.status(422).send({ error: `${LOST_ITEM}_${CONTROLLER_ERROR_CODES.MISSING_DATA.message}` });
        } else if (error?.message === `${LOST_ITEM}_${id}_${DB_ERROR_CODES.NOT_FOUND}`) {
            res.status(404).send({
                error: `${LOST_ITEM}_${id}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`
            });
        } else {
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};

export const deleteLostItem = async (req: any, res: any) => {
    let id;
    try {
        id = parseInt(req?.params?.id);
        const deleteLostItemResponse = await deleteLostItemService(id);
        res.status(200).send(deleteLostItemResponse);
    } catch (error: any) {
        if (error?.message === `${LOST_ITEM}_${id}_${DB_ERROR_CODES.NOT_FOUND}`) {
            res.status(404).send({
                error: `${LOST_ITEM}_${id}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`
            });
        } else {
            res.status(500).send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
        }
    }
};
