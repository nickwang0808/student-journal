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
  body("description").isString().optional(true),
  body("quote.name").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, quote } = req.body;

      const newJournal = (
        await Journal.create({
          title,
          description,
        })
      ).$set("quote", quote);

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
  body("description").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, title, description } = req.body as Journal;

    try {
      const journalToUpdate = await Journal.findByPk(id);

      const newJournal = await journalToUpdate?.update({ title, description });

      return res.status(200).send(newJournal);
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

router.delete(
  "/journals",
  body("id").isArray(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await Journal.destroy({ where: { id: req.body.id } });
      return res.status(200).send("delete successful");
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

export default router;
