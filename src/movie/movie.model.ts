import { Schema, Model, model } from "mongoose";
import { MovieInterface } from "./Movie";

const MovieSchema = new Schema({
  name: String,
  year: Number,
  genre: String,
});

export const Movie: Model<MovieInterface> = model<MovieInterface>(
  "Movie",
  MovieSchema
);
