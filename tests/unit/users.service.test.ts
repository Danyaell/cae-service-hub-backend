import prisma from "../../src/prisma";
import { DB_ERROR_CODES } from "../../src/constants/errors.const";
import {
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  signinService,
  updateUserService,
} from "../../src/services/users.service";
import { USER } from "../../src/constants/routes.const";

describe("Users Service - Database queries", () => {
  let testUsersId: number;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await prisma.users.deleteMany({});
  });

  it("should create a user successfully", async () => {
    const data = {
      name: "Admin",
      password: "1234",
      role: "Encargado",
      created_at: new Date(),
    };

    const user = await signinService(data);
    testUsersId = user.id;

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Admin");
  });

  it("should return all users", async () => {
    await signinService({
      name: "Encargado 1",
      password: "1111",
      role: "Encargado",
      created_at: new Date(),
    });

    const users = await getAllUsersService();
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty("name");
  });

  it("should get user by id", async () => {
    const user = await getUserByIdService(testUsersId);
    expect(user.id).toBe(testUsersId);
  });

  it("should throw error if request not found by id", async () => {
    await expect(getUserByIdService(9999)).rejects.toThrow(
      `${USER}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should update a request successfully", async () => {
    const updatedData = {
      name: "Administrador",
      password: "12345",
      role: "Encargado",
    };

    const updated = await updateUserService(testUsersId, updatedData);
    expect(updated.name).toBe("Administrador");
  });

  it("should throw error if updating non-existent user", async () => {
    const data = {
      name: "Administrador",
      password: "12345",
      role: "Encargado",
    };

    await expect(updateUserService(9999, data)).rejects.toThrow(
      `${USER}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should delete a user successfully", async () => {
    const deleted = await deleteUserService(testUsersId);
    expect(deleted.id).toBe(testUsersId);

    await expect(getUserByIdService(testUsersId)).rejects.toThrow(
      `${USER}_${testUsersId}_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });

  it("should throw error if deleting non-existent lost item", async () => {
    await expect(deleteUserService(9999)).rejects.toThrow(
      `${USER}_9999_${DB_ERROR_CODES.NOT_FOUND}`
    );
  });
});
