import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { save, getAll } from "./user.service";

class UserController {
  public async save(req: Request, res: Response): Promise<Response> {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ errors: errorsValidation.array() });
    }

    try {
      const user = await save(req);
      return res.status(201).json({user: user});
    } catch (e) {
      console.error(e);
      return res.status(e.status).json({ error: e.error });
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ errors: errorsValidation.array() });
    }

    try { 
      const users = await getAll();
      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).send({ error: e.message });
    }
  }
}

export default new UserController();
