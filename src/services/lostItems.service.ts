import { DB_ERROR_CODES } from "../constants/errors.const";
import { LOST_ITEM, LOST_ITEMS } from "../constants/routes.const";
import prisma from "../prisma";

/**
 * Retrieves all lost items from the database.
 */
export const getAllLostItemsService = async () => {
  const lostItems = await prisma.lost_items.findMany({
    select: {
      id: true,
      date: true,
      room: true,
      description: true,
      returned: true,
    },
  });
  if (!lostItems) {
    throw new Error(`${LOST_ITEMS}_${DB_ERROR_CODES.NOT_FOUND}`);
  }
  return lostItems;
};

/**
 * Retrieves a single lost item by ID.
 * @param id - The ID of the lost item to retrieve.
 */
export const getLostItemsByIdService = async (id: number) => {
  const lostItems = await prisma.lost_items.findUnique({ where: { id } });
  if (!id || !lostItems) {
    throw new Error(`${LOST_ITEM}_${id}_${DB_ERROR_CODES.NOT_FOUND}`);
  }
  return lostItems;
};

/**
 * Creates a new lost item entry.
 * @param data - The data for the new lost item.
 */
export const createLostItemService = async (data: any) => {
  if (!data?.date || !data?.room || !data?.description) {
    throw new Error(`${LOST_ITEM}_${DB_ERROR_CODES.INVALID_DATA}`);
  }
  const createdLostItem = await prisma.lost_items.create({ data });
  return createdLostItem;
};

/**
 * Updates a lost item by ID.
 * @param id - The ID of the lost item to update.
 * @param data - The updated lost item data.
 */
export const updateLostItemService = async (id: number, data: any) => {
  if (!data?.date || !data?.room || !data?.description) {
    throw new Error(`${LOST_ITEM}_${DB_ERROR_CODES.INVALID_DATA}`);
  } else if (!id || !(await prisma.lost_items.findUnique({ where: { id } }))) {
    throw new Error(`${LOST_ITEM}_${id}_${DB_ERROR_CODES.NOT_FOUND}`);
  }
  const updatedLostItem = await prisma.lost_items.update({
    where: { id },
    data,
  });
  return updatedLostItem;
};

/**
 * Deletes a lost item by ID.
 * @param id - The ID of the lost item to delete.
 */
export const deleteLostItemService = async (id: number) => {
  if (!id || !(await prisma.lost_items.findUnique({ where: { id } }))) {
    throw new Error(`${LOST_ITEM}_${id}_${DB_ERROR_CODES.NOT_FOUND}`);
  }
  const deletedLostItem = await prisma.lost_items.delete({ where: { id } });
  return deletedLostItem;
};
