import { Sequelize } from "sequelize";
import { sequelize } from ".";
import Journal from "./Journal";
import Quote from "./Quote";

describe("models works", () => {
  let db: Sequelize = sequelize;
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  afterAll(async () => {
    await db.close();
  });

  it("should create quote table and insert 1 quote", async () => {
    await Quote.create({ name: "first quote" });

    const quotes = await Quote.findAll();

    expect(quotes.length).toBe(1);
    expect(quotes[0].name).toBe("first quote");
  });

  it("should create journal table and insert 1 journal", async () => {
    await (
      await Journal.create({
        title: "first journal",
        description: "description",
      })
    ).$create("quote", { name: "second quote" });

    const journal = await Journal.findOne({ include: [Quote] });
    console.log({ journal });

    expect(journal?.title).toBe("first journal");
    expect(journal?.quote?.name).toBe("second quote");
  });
});
