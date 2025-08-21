import prisma from "../../src/prisma";
import { DB_ERROR_CODES } from "../../src/constants/errors.const";
import {
  createLostItemService,
  deleteLostItemService,
  getAllLostItemsService,
  getLostItemsByIdService,
  updateLostItemService,
} from "../../src/services/lostItems.service";
import { LOST_ITEM } from "../../src/constants/routes.const";

describe("Lost Items Service - Database queries", () => {
  let testLostItemsId: number;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await prisma.lost_items.deleteMany({});
  });

  it("should create a lost item successfully", async () => {
    const data = {
      date: new Date(),
      room: "A203",
      description: "White bottle",
      returned: false,
    };

    const lostItem = await createLostItemService(data);
    testLostItemsId = lostItem.id;

    expect(lostItem).toHaveProperty("id");
    expect(lostItem.returned).toBe(false);
  });

  it("should return all lost item", async () => {
    await createLostItemService({
      date: new Date(),
      room: "A203",
      description: "Black bottle",
      returned: false,
    });

    const lostItems = await getAllLostItemsService();
    expect(lostItems.length).toBeGreaterThan(0);
    expect(lostItems[0]).toHaveProperty("returned");
  });

  it("should get lost item by id", async () => {
    const lostItem = await getLostItemsByIdService(testLostItemsId);
    expect(lostItem.id).toBe(testLostItemsId);
  });

  it("should throw error if request not found by id", async () => {
    await expect(getLostItemsByIdService(9999)).rejects.toThrow(
      `${LOST_ITEM}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should update a request successfully", async () => {
    const updatedData = {
      date: new Date(),
      room: "A204",
      description: "White bottle",
      returned: true,
    };

    const updated = await updateLostItemService(testLostItemsId, updatedData);
    expect(updated.room).toBe("A204");
    expect(updated.returned).toBe(true);
  });

  it("should throw error if updating non-existent request", async () => {
    const data = {
      date: new Date(),
      room: "A204",
      description: "White bottle",
      returned: true,
    };

    await expect(updateLostItemService(9999, data)).rejects.toThrow(
      `${LOST_ITEM}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should delete a lost item successfully", async () => {
    const deleted = await deleteLostItemService(testLostItemsId);
    expect(deleted.id).toBe(testLostItemsId);

    await expect(getLostItemsByIdService(testLostItemsId)).rejects.toThrow(
      `${LOST_ITEM}_${testLostItemsId}_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should throw error if deleting non-existent lost item", async () => {
    await expect(deleteLostItemService(9999)).rejects.toThrow(
      `${LOST_ITEM}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });
});
