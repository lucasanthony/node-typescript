import { Schema, Model, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { UserInterface } from "./User";

const UserSchema = new Schema({
  name: String,
  password: String,
  email: String,
  token_list: [String]
});

UserSchema.pre('save', function (next): void {
  let user = this as UserInterface;

  bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR), function (err, salt): void {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash): void {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

export const User: Model<UserInterface> = model<UserInterface>(
  "User",
  UserSchema
);
