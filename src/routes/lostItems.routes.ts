import express from "express";
import { createLostItem, deleteLostItem, getAllLostItems, getLostItemById, updateLostItem } from "../controllers/lostItems.controller";

const router = express.Router();

router.get("/", getAllLostItems);
router.get("/:id", getLostItemById);
router.post("/", createLostItem);
router.put("/:id", updateLostItem);
router.delete("/:id", deleteLostItem);

export default router;
