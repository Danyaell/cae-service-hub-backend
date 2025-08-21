import express from "express";
import {
  createLostItem,
  deleteLostItem,
  getAllLostItems,
  getLostItemById,
  updateLostItem,
} from "../controllers/lostItems.controller";

const router = express.Router();

/**
 * GET /lost-items
 * Returns all reported lost items.
 */
router.get("/", getAllLostItems);

/**
 * GET /lost-items/:id
 * Returns a specific lost item by its ID.
 */
router.get("/:id", getLostItemById);

/**
 * POST /lost-items
 * Creates a new lost item entry.
 */
router.post("/", createLostItem);

/**
 * PUT /lost-items/:id
 * Updates an existing lost item by its ID.
 */
router.put("/:id", updateLostItem);

/**
 * DELETE /lost-items/:id
 * Deletes a lost item by its ID.
 */
router.delete("/:id", deleteLostItem);

export default router;
