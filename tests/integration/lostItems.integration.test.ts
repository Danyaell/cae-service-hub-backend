import lostItem from "supertest";
import { app } from "../../src/app";
import prisma from "../../src/prisma";
import { A203 } from "../../src/constants/common.const";

describe("Lost Items API Integration", () => {
  let testLostItemId: number;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.lost_items.deleteMany({});
    await prisma.$disconnect();
  });

  it("POST /api/lost-items - should create a lost item", async () => {
    const data = {
      date: new Date(),
      room: A203,
      description: "A new description",
      returned: false,
    };

    const res = await lostItem(app).post("/api/lost-items").send(data);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    testLostItemId = res.body.id;
  });

  it("GET /api/lost-items - should return all lost items", async () => {
    const res = await lostItem(app).get("/api/lost-items");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /api/lost-items/:id - should return a lost item by id", async () => {
    const res = await lostItem(app).get(`/api/lost-items/${testLostItemId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(testLostItemId);
  });

  it("GET /api/lost-items/:id - should return 404 for non-existent item", async () => {
    const res = await lostItem(app).get(`/api/lost-items/9999`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("PUT /api/lost-items/:id - should update a lost item", async () => {
    const updatedData = {
      date: new Date(),
      room: A203,
      description: "Another description",
      returned: true,
    };

    const res = await lostItem(app)
      .put(`/api/lost-items/${testLostItemId}`)
      .send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.returned).toBe(true);
  });

  it("PUT /api/lost-items/:id - should return 404 for non-existent item", async () => {
    const res = await lostItem(app).put("/api/lost-items/9999").send({
      date: new Date(),
      room: A203,
      description: "Another description!!",
      returned: true,
    });
    expect(res.status).toBe(404);
  });

  it("DELETE /api/lost-items/:id - should delete a lost item", async () => {
    const res = await lostItem(app).delete(`/api/lost-items/${testLostItemId}`);
    expect(res.status).toBe(200);
  });

  it("DELETE /api/lost-items/:id - should return 404 for non-existent item", async () => {
    const res = await lostItem(app).delete("/api/lost-items/9999");
    expect(res.status).toBe(404);
  });
});
