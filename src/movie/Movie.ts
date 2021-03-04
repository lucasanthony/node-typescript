import { Document } from "mongoose";

export interface MovieInterface extends Document {
  name: String;
  year: Number;
  genre: String;
}
