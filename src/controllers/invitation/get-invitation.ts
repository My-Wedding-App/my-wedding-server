import { Request, Response } from "express";
import { Tables } from "../../config/db";
import { HttpMethodType } from "../../types/common";
import { badRequest, HttpMethod, successResponse } from "../../utils/common";
import { dynamoDBGetItem } from "../../utils/db";
import Controller from "../controller";

class GetInvitation implements Controller {
  public method = (): HttpMethodType => {
    return HttpMethod.GET;
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public path = (): string => {
    return '/invitation/:invitationId';
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { params } = req;
      const { invitationId } = params;
      const tableName = Tables.INVITATION_TABLE;
      const partitionKeyName = 'invitationId';
      const response = await dynamoDBGetItem(tableName, partitionKeyName, invitationId);
      await successResponse(response , res);
    } 
    catch (error: any) {
      console.log('Error in get invitation', error);
      await badRequest(error, res);
      throw new Error(`Error in get invitation: ${error}`);
    }
  }
}

export default GetInvitation;
