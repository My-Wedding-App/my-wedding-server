import { Request, Response } from "express";
import { Tables } from "../../config/db";
import { HttpMethodType } from "../../types/common";
import { HttpMethod, successResponse } from "../../utils/common";
import { dynamoDBPutItem } from "../../utils/db";
import Controller from "../controller";

class CreateInvitation implements Controller {
  public method = (): HttpMethodType => {
    return HttpMethod.POST;
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public path = (): string => {
    return '/invitation/:invitationId';
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { body } = req;
      const tableName = Tables.INVITATION_TABLE;
      const item = {
        invitationId: body.invitationId,
        content: body.content
      };
      const response = await dynamoDBPutItem(tableName, item);
      await successResponse(response, res);
    }
    catch (error: any) {
      console.log('Error in create invitation', error);
      throw new Error(`Error in create invitation: ${error}`);
    }
  }
}

export default CreateInvitation;
