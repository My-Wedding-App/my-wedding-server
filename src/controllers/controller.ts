import { Request, Response, NextFunction } from "express";
import { HttpMethod } from "../types/common";

interface Controller {
  method(): HttpMethod;
  isPrivate(): boolean;
  path(): string;
  handler(
    req: Request,
    res: Response,
    next: NextFunction
  ) : Promise<void>,
}

export default Controller;
