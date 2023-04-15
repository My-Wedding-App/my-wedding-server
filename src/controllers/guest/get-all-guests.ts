import { Request, Response } from "express";
import { Tables } from "../../config/db";
import { HttpMethodType } from "../../types/common";
import { badRequest, HttpMethod, successResponse } from "../../utils/common";
import { dynamoDBGetItem, dynamoDBScan } from "../../utils/db";
import Controller from "../controller";

class GetAllGuest implements Controller {
  public method = (): HttpMethodType => {
    return HttpMethod.GET;
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public path = (): string => {
    return '/wedding/:weddingId/guests';
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { params } = req;
      const { weddingId } = params;
      const tableName = Tables.GUEST_TABLE;

      const data = await dynamoDBScan(tableName);
      const response = data.filter((guest: { weddingId: string; }) => guest.weddingId == weddingId);
      await successResponse(response, res);
    } 
    catch (error: any) {
      console.log('Error in get guests', error);
      await badRequest(error, res);
      throw new Error(`Error in get guests: ${error}`);
    }
  }
}

export default GetAllGuest;
