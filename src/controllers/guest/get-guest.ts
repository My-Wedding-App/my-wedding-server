import { Request, Response } from "express";
import { Tables } from "../../config/db";
import { HttpMethodType } from "../../types/common";
import { badRequest, HttpMethod, successResponse } from "../../utils/common";
import { dynamoDBGetItem } from "../../utils/db";
import Controller from "../controller";

class GetGuest implements Controller {
  public method = (): HttpMethodType => {
    return HttpMethod.GET;
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public path = (): string => {
    return '/guest/:guestId';
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { params } = req;
      const { guestId } = params;
      const tableName = Tables.GUEST_TABLE;
      const partitionKeyName = 'guestId'
      const response = await dynamoDBGetItem(tableName, partitionKeyName, guestId);
      await successResponse(response , res);
    } 
    catch (error: any) {
      console.log('Error in get invitation', error);
      await badRequest(error, res);
      throw new Error(`Error in get invitation: ${error}`);
    }
  }
}

export default GetGuest;
