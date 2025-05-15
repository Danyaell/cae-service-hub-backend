import express from "express";
import {
    getAllSoftwareRequests,
    getSoftwareRequest,
    createSoftwareRequest,
    updateSoftwareRequest,
    deleteSoftwareRequest,
} from "../controllers/softwareRequests.controller";

const router = express.Router();

router.get("/", getAllSoftwareRequests);
router.get("/:id", getSoftwareRequest);
router.post("/", createSoftwareRequest);
router.put("/:id", updateSoftwareRequest);
router.delete("/:id", deleteSoftwareRequest);

export default router;
