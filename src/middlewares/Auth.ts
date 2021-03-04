import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../user/user.model";

export const JwtFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization as String;

  if (!authHeader) return res.status(401).send({ error: "Sem token irmão" });

  const parts = authHeader.split(" ");

  if (!(parts.length === 2))
    return res.status(401).send({ error: "Erro de token" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token mal formatado" });

  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).send({ error: "Token inválido" });
  }

  const user = await User.findOne({ _id: jwtPayload.sub });

  if (!user) return res.status(404).send({ error: "Usuário não existe!" });

  const token_list = user.token_list;
  if (!token_list.includes(token)) {
    return res.status(401).send({ error: "Token inválido" });
  }

  req.body.id = jwtPayload.sub;
  req.body.user = user;
  return next();
};
