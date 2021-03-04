import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { save, getByGenre } from "./movie.service";

class MovieController {
  public async save(req: Request, res: Response): Promise<Response> {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ errors: errorsValidation.array() });
    }

    try {
      const movie = await save(req);
      return res.status(201).json(movie);
    } catch (e) {
      console.error(e);
      return res.status(e.status).json({ error: e.error });
    }
  }

  public async getByGenre(req: Request, res: Response): Promise<Response> {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ errors: errorsValidation.array() });
    }

    try { 
      const movies = await getByGenre(req.query.genre as String);
      return res.status(200).json(movies);
    } catch (e) {
      console.error(e);
      return res.status(500).send({ error: e.message });
    }
  }
}

export default new MovieController();
