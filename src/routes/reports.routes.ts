import express from "express";
import {
  createReport,
  deleteReport,
  getAllReports,
  getReportById,
  updateReport,
} from "../controllers/reports.controller";

const router = express.Router();

/**
 * GET /reports
 * Returns all reports.
 */
router.get("/", getAllReports);

/**
 * GET /reports/:id
 * Returns a specific report by ID.
 */
router.get("/:id", getReportById);

/**
 * POST /reports
 * Creates a new report.
 */
router.post("/", createReport);

/**
 * PUT /reports/:id
 * Updates an existing report by ID.
 */
router.put("/:id", updateReport);

/**
 * DELETE /reports/:id
 * Deletes a report by ID.
 */
router.delete("/:id", deleteReport);

export default router;
