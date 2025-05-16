import express from "express";
import {
    createReport,
    deleteReport,
    getAllReports,
    getReportById,
    updateReport
} from "../controllers/reports.controller";

const router = express.Router();

router.get("/", getAllReports);
router.get("/:id", getReportById);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;
