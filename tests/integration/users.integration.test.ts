import users from "supertest";
import { app } from "../../src/app";
import prisma from "../../src/prisma";

describe("Users API Integration", () => {
  let testusersId: number;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.users.deleteMany({});
    await prisma.$disconnect();
  });

  it("POST /api/users/register - should create a user", async () => {
    const data = {
      name: "Admin",
      password: "1234",
      role: "Encargado",
      created_at: new Date(),
    };

    const res = await users(app).post("/api/users/register").send(data);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    testusersId = res.body.id;
  });

  it("GET /api/users - should return all users", async () => {
    const res = await users(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /api/users/login - should login a user", async () => {
	const data = {
      name: "Admin",
      password: "1234",
    };

    const res = await users(app).post(`/api/users/login`).send(data);
    expect(res.status).toBe(200);
  });

  it("PUT /api/users/:id - should update a user", async () => {
    const updatedData = {
      name: "Administrador",
      password: "12345",
      role: "Encargado",
      created_at: new Date(),
    };

    const res = await users(app)
      .put(`/api/users/${testusersId}`)
      .send(updatedData);
    expect(res.status).toBe(200);
  });

  it("PUT /api/users/:id - should return 404 for non-existent item", async () => {
    const res = await users(app).put("/api/users/9999").send({
      name: "Administrador",
      password: "12345",
      role: "Encargado",
      created_at: new Date(),
    });
    expect(res.status).toBe(404);
  });

  it("DELETE /api/users/:id - should delete a user", async () => {
    const res = await users(app).delete(`/api/users/${testusersId}`);
    expect(res.status).toBe(200);
  });

  it("DELETE /api/users/:id - should return 404 for non-existent item", async () => {
    const res = await users(app).delete("/api/users/9999");
    expect(res.status).toBe(404);
  });
});
