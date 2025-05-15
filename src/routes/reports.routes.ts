import express from "express";
import {
    createReport,
    deleteReport,
    getAllReports,
    getReport,
    updateReport
} from "../controllers/reports.controller";

const router = express.Router();

router.get("/", getAllReports);
router.get("/:id", getReport);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;
