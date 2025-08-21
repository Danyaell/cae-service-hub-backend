import express from "express";
import {
  getAllSoftwareRequests,
  getSoftwareRequestById,
  createSoftwareRequest,
  updateSoftwareRequest,
  deleteSoftwareRequest,
} from "../controllers/softwareRequests.controller";

const router = express.Router();

/**
 * GET /software-requests
 * Returns all software requests.
 */
router.get("/", getAllSoftwareRequests);

/**
 * GET /software-requests/:id
 * Returns a specific software request by ID.
 */
router.get("/:id", getSoftwareRequestById);

/**
 * POST /software-requests
 * Creates a new software request.
 */
router.post("/", createSoftwareRequest);

/**
 * PUT /software-requests/:id
 * Updates an existing software request by ID.
 */
router.put("/:id", updateSoftwareRequest);

/**
 * DELETE /software-requests/:id
 * Deletes a software request by ID.
 */
router.delete("/:id", deleteSoftwareRequest);

export default router;
