import { Movie } from "./movie.model";
import { MovieInterface } from "./Movie";
import { Request } from "express";

export async function save(req: Request): Promise<MovieInterface> {
  let movie = await Movie.findOne({ name: req.body.name }).catch(
    (err: Record<string, string>): Promise<MovieInterface> => {
      err.status = "500";
      throw err;
    }
  );

  if (movie) {
    const e = {
      error: {
        value: movie.name,
        msg: "Filme já cadastrado",
        param: "name",
        location: "body",
      },
      status: 409,
    };
    throw e;
  } else {
    const movie = await Movie.create(req.body);
    return movie;
  }
}

export async function getAll(): Promise<MovieInterface[]> {
  return Movie.find();
}

export async function getByGenre(genre: String): Promise<MovieInterface[]> {
  return Movie.find({ genre: genre });
}
