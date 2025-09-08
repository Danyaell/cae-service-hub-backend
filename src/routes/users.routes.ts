import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  signin,
  updateUser,
} from "../controllers/users.controller";

const router = express.Router();

/**
 * GET /users
 * Returns all registered users.
 */
router.get("/", getAllUsers);

/**
 * GET /users
 * Returns all registered users.
 */
router.get("/:id", getUserById);

/**
 * POST /users/register
 * Registers a new user account.
 */
router.post("/register", signin);

/**
 * POST /users/login
 * Authenticates a user and returns a session/token.
 */
router.post("/login", login);

/**
 * PUT /users/:id
 * Updates user information by ID.
 */
router.put("/:id", updateUser);

/**
 * DELETE /users/:id
 * Deletes a user account by ID.
 */
router.delete("/:id", deleteUser);

export default router;
