import express from "express";
import {
    getAllSoftwareRequests,
    getSoftwareRequestById,
    createSoftwareRequest,
    updateSoftwareRequest,
    deleteSoftwareRequest,
} from "../controllers/softwareRequests.controller";

const router = express.Router();

router.get("/", getAllSoftwareRequests);
router.get("/:id", getSoftwareRequestById);
router.post("/", createSoftwareRequest);
router.put("/:id", updateSoftwareRequest);
router.delete("/:id", deleteSoftwareRequest);

export default router;
