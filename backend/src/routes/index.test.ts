import { Sequelize } from "sequelize";
import { server } from "..";
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
