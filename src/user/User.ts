import { Document } from "mongoose";

export interface UserInterface extends Document {
  name: String;
  password: String;
  email: String;
  token_list: [String];
}
