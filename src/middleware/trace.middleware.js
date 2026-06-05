import { v4 as uuid } from "uuid";

export const traceMiddleware = (req, res, next) => {
  req.traceId = uuid();

  next();
};