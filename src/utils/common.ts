import { Response } from "express";

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export const successResponse = async (response: any, res: Response) => {
  const result = response && response.length > 0 ? response : [];
  res.status(200);
  res.send(result);
}

export const internalServerError = async (error: any, res: Response) => {
  const result = error ? error :`unknown error ocurred`;
  res.status(500);
  res.send(result);  
}

export const badRequest = async (error: any, res: Response) => {
  const result = error ? error :`unknown error ocurred`;
  res.status(400);
  res.send(result);  
}
