import express from "express";
import {
    getAllSoftwareRequests,
    getSoftwareRequest,
    createSoftwareRequest,
    updateSoftwareRequest,
    deleteSoftwareRequest,
    getAllReports,
    getReport,
    createReport,
    updateReport,
    deleteReport,
} from "../controllers/softwareRequests.controller";

const router = express.Router();

router.get("/", getAllSoftwareRequests);
router.get("/:id", getSoftwareRequest);
router.post("/", createSoftwareRequest);
router.put("/:id", updateSoftwareRequest);
router.delete("/:id", deleteSoftwareRequest);

router.get("/", getAllReports);
router.get("/:id", getReport);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;
