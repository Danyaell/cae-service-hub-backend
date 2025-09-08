import {
  CONTROLLER_ERROR_CODES,
  DB_ERROR_CODES,
} from "../constants/errors.const";
import { USER } from "../constants/routes.const";
import {
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  getUserByNameService,
  signinService,
  updateUserService,
} from "../services/users.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../utils/auth";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/**
 * Retrieves all users.
 */
export const getAllUsers = async (_req: AuthRequest, res: any) => {
  try {
    const usersResponse = await getAllUsersService();
    res.status(200).send(usersResponse);
  } catch (error: any) {
    res
      .status(500)
      .send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
  }
};

/**
 * Retrieves a user by ID.
 */
export const getUserById = async (_req: AuthRequest, res: any) => {
  let id;
  try {
    id = parseInt(_req?.params?.id);
    const userResponse = await getUserByIdService(id);
    res.status(200).send(userResponse);
  } catch (error: any) {
    res
      .status(500)
      .send({ error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message });
  }
};

/**
 * Registers a new user with hashed password.
 */
export const signin = async (req: any, res: any) => {
  try {
    const requestBody = {
      name: req?.body?.name,
      password: await bcrypt.hash(req?.body?.password, 10),
      role: req?.body?.role,
      created_at: new Date(),
    };
    const user = await signinService(requestBody);
    res.status(200).send(user);
  } catch (error: any) {
    if (error?.message === `${USER}_${DB_ERROR_CODES.DUPLICATE}`) {
      res.status(409).send({ error: `${USER}_${DB_ERROR_CODES.DUPLICATE}` });
    } else if (error?.message === `${USER}_${DB_ERROR_CODES.INVALID_DATA}`) {
      res
        .status(422)
        .send({
          error: `${USER}_${CONTROLLER_ERROR_CODES.MISSING_DATA.message}`,
        });
    } else {
      res
        .status(500)
        .send({ error: "Internal Server Error", errorMessage: error.message });
    }
  }
};

/**
 * Authenticates a user and returns a JWT.
 */
export const login = async (req: any, res: any) => {
  try {
    const { name, password } = req.body;
    const user = await getUserByNameService(name);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new Error(`${USER}_${DB_ERROR_CODES.UNAUTHORIZED}`);

    const token = jwt.sign(
      {
        id: user?.id,
        name: user?.name,
        router: user?.role,
      },
      JWT_SECRET,
      { expiresIn: "5h" }
    );

    return res.status(200).send({
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  } catch (error: any) {
    if (error?.message === `${USER}_${DB_ERROR_CODES.NOT_FOUND}`) {
      res
        .status(404)
        .send({
          error: `${USER}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_CREDENTIALS.message}`,
        });
    } else if (error?.message === `${USER}_${DB_ERROR_CODES.UNAUTHORIZED}`) {
      res
        .status(401)
        .send({
          error: `${USER}_${CONTROLLER_ERROR_CODES.INVALID_CREDENTIALS.message}`,
        });
    } else {
      res
        .status(500)
        .send({ error: "Internal Server Error", errorMessage: error.message });
    }
  }
};

/**
 * Updates a user's details including password.
 */
export const updateUser = async (req: any, res: any) => {
  let id;
  try {
    id = parseInt(req?.params?.id);
    const requestBody = {
      name: req?.body?.name,
      password: await bcrypt.hash(req?.body?.password, 10),
      role: req?.body?.role,
      updated_at: new Date(),
    };
    const updateUserResponse = await updateUserService(id, requestBody);
    res.status(200).send(updateUserResponse);
  } catch (error: any) {
    if (error?.message === `${USER}_${DB_ERROR_CODES.INVALID_DATA}`) {
      res
        .status(422)
        .send({
          error: `${USER}_${CONTROLLER_ERROR_CODES.MISSING_DATA.message}`,
        });
    } else if (error?.message === `${USER}_${id}_${DB_ERROR_CODES.NOT_FOUND}`) {
      res
        .status(404)
        .send({
          error: `${USER}_${id}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`,
        });
    } else {
      res
        .status(500)
        .send({
          error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message,
          errorMessage: error.message,
        });
    }
  }
};

/**
 * Deletes a user by ID.
 */
export const deleteUser = async (req: any, res: any) => {
  let id;
  try {
    id = parseInt(req?.params?.id);
    const deleteUserResponse = await deleteUserService(id);
    res.status(200).send(deleteUserResponse);
  } catch (error: any) {
    if (error?.message === `${USER}_${id}_${DB_ERROR_CODES.NOT_FOUND}`) {
      res
        .status(404)
        .send({
          error: `${USER}_${id}_${DB_ERROR_CODES.NOT_FOUND}_${CONTROLLER_ERROR_CODES.INVALID_PARAMS.message}`,
        });
    } else {
      res
        .status(500)
        .send({
          error: CONTROLLER_ERROR_CODES.INTERNAL_SERVER_ERROR.message,
          errorMessage: error.message,
        });
    }
  }
};
