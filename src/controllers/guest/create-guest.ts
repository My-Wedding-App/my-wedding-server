import { Request, Response } from "express";
import { Tables } from "../../config/db";
import { HttpMethodType } from "../../types/common";
import { badRequest, HttpMethod, successResponse } from "../../utils/common";
import { dynamoDBPutItem } from "../../utils/db";
import Controller from "../controller";

class CreateGuest implements Controller {
  public method = (): HttpMethodType => {
    return HttpMethod.POST;
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public path = (): string => {
    return '/guest/:guestId';
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { body, params } = req;
      const { guestId } = params;
      const { invitationId, title, name } = body;

      const tableName = Tables.GUEST_TABLE;

      const item = {
        guestId: guestId,
        invitationId: invitationId,
        title: title,
        name: name
      };
      const response = await dynamoDBPutItem(tableName, item);
      await successResponse(response, res);
    }
    catch (error: any) {
      console.log('Error in create guest', error);
      await badRequest(error, res);
      throw new Error(`Error in create guest: ${error}`);
    }
  }
}

export default CreateGuest;
