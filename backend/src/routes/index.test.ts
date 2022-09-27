import { Sequelize } from "sequelize";
import supertest from "supertest";
import { app, server } from "..";
import { Journal, Quote, sequelize } from "../models";

describe("Journal routes should work", () => {
  let db: Sequelize = sequelize;

  beforeAll(async () => {
    await db.sync({ force: true });
    await seedDb();
  });
  afterAll(async () => {
    await db.close();
    server.close();
  });

  it("should seed the db", async () => {
    const journals = await Journal.findAll({ include: [Quote] });

    expect(journals.length).toBe(4);
  });

  describe("GET", () => {
    it("should get all journals", async () => {
      const { body, status } = await supertest(app).get("/journals");

      expect(status).toBe(200);
      expect(body.length).toBe(4);
    });
  });

  describe("POST", () => {
    it("should create a post with a quote", async () => {
      const data = {
        title: "title A",
        description: "desc",
        quote: { name: "quote A" },
      };

      const { body, status } = await supertest(app)
        .post("/journals")
        .send(data);

      expect(status).toBe(200);
      expect(body.title).toBe(data.title);
    });

    it("should return 422 with bad request body", async () => {
      const data = {
        title: 1,
        description: "desc",
        quote: { name: "quote A" },
      };

      const { status } = await supertest(app).post("/journals").send(data);

      expect(status).toBe(422);
    });
  });

  describe("PATCH", () => {
    it("should update journal", async () => {
      const data = {
        id: 5,
        title: "title A updated",
        description: "desc",
      };

      const { body, status } = await supertest(app)
        .patch("/journals")
        .send(data);

      expect(status).toBe(200);
      expect(body.title).toBe(data.title);
    });

    it("should return 422 with bad request body", async () => {
      const data = {
        title: 1,
        description: "desc",
        quote: { name: "quote A" },
      };

      const { status } = await supertest(app).patch("/journals").send(data);

      expect(status).toBe(422);
    });
  });

  describe("DELETE", () => {
    it("should delete journal with id 5", async () => {
      const deleteRes = await supertest(app)
        .delete("/journals")
        .send({ id: 5 });

      expect(deleteRes.status).toBe(200);

      const getRes = await supertest(app).get("/journals");

      expect(getRes.status).toBe(200);
      expect(getRes.body.length).toBe(4);
      expect(getRes.body.find((elem: any) => elem.id === 5)).toBeUndefined();
    });
    it("should return 422 with bad req body", async () => {
      const deleteRes = await supertest(app)
        .delete("/journals")
        .send({ notID: 5 });

      expect(deleteRes.status).toBe(422);
    });
  });
});

async function seedDb() {
  const data = [
    {
      title: "title 1",
      description: "description",
      quote: { name: "quote 1" },
    },
    {
      title: "title 2",
      description: "description",
      quote: { name: "quote 2" },
    },
    {
      title: "title 3",
      description: "description",
      quote: { name: "quote 3" },
    },
    {
      title: "title 4",
      description: "description",
      quote: { name: "quote 4" },
    },
  ];

  await Promise.all(
    data.map(async ({ title, description, quote }) => {
      await (
        await Journal.create({ title, description })
      ).$create("quote", quote);
    })
  );
}
