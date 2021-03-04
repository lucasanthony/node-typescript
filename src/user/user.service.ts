import { User } from "./user.model";
import { UserInterface } from "./User";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

function signToken(user: UserInterface) {
    return jwt.sign({
        iss: 'TS-study',
        sub: user.id,
        iat: new Date().getTime(),
    }, process.env.JWT_SECRET);
}

export async function save(req: Request): Promise<{user: UserInterface, token: String}> {
  let user = await User.findOne({ email: req.body.email }).catch(
    (err: Record<string, string>): Promise<UserInterface> => {
      err.status = "500";
      throw err;
    }
  );

  if (user) {
    const e = {
      error: {
        value: user.email,
        msg: "usuário já cadastrado",
        param: "email",
        location: "body",
      },
      status: 409,
    };
    throw e;
  } else {
    const user = await User.create(req.body);
    const token = signToken(user);
    return {user, token}
  }
}

export async function getAll(): Promise<UserInterface[]> {
  return User.find();
}
