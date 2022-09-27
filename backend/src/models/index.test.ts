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

  it("should have no journals and no quotes", async () => {
    const journals = await Journal.findAll();
    const quotes = await Quote.findAll();
    expect(journals.length).toBe(0);
    expect(quotes.length).toBe(0);
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

    expect(journal?.title).toBe("first journal");
    expect(journal?.quote?.name).toBe("second quote");
  });

  it("quote ondelete is cascading", async () => {
    const journal = await Journal.findOne({ include: [Quote] });
    if (!journal) {
      throw new Error("no journal to be deleted");
    }

    journal.quote.destroy();

    const journals = await Journal.findAll();

    expect(journals.length).toBe(0);
  });
});
