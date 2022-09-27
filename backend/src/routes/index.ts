import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Journal, Quote } from "../models";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Root resource of the app");
});

router.get("/journals", async (req: Request, res: Response) => {
  try {
    const allJournals = await await Journal.findAll({
      include: [Quote],
      order: [["createdAt", "desc"]],
    });
    res.status(200).json(allJournals);
  } catch (error) {
    console.error(error);
    return res.status(500).send("something went wrong on our end");
  }
});

router.post(
  "/journals",
  body("title").isString(),
  body("content").isString().optional(true),
  body("quote").custom((value) => {
    if (!value?.content) {
      throw new Error("quote is missing name");
    }
    return true;
  }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array(), Text: "schema validation failure" });
    }

    try {
      const { title, content, quote } = req.body;

      const newJournal = await Journal.create({
        title,
        content,
      });
      await newJournal.$create("quote", quote);

      await newJournal.$get("quote");

      return res.status(200).json(newJournal);
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

router.patch(
  "/journals",
  body("id").isInt(),
  body("title").isString(),
  body("content").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array(), Text: "schema validation failure" });
    }

    const { id, title, content } = req.body as Journal;

    try {
      const journalToUpdate = await Journal.findByPk(id);

      const newJournal = await journalToUpdate?.update({ title, content });

      return res.status(200).send(newJournal);
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

router.delete(
  "/journals",
  body("id").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array(), Text: "schema validation failure" });
    }

    const id = req.body.id as number;

    try {
      // foreign key is in Journay model, so delete is not casacading in Journal
      const journal = await Journal.findByPk(id, { include: [Quote] });
      if (!journal) {
        return res.status(404).send("journal not found");
      }

      journal.quote.destroy({});

      return res.status(200).send("delete successful");
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

export default router;
