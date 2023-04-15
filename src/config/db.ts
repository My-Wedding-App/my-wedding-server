import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
const stage = process.env.STAGE;

AWS.config.update({
  region: 'us-west-1'
});

const db = new AWS.DynamoDB.DocumentClient();

export enum Tables {
  INVITATION_TABLE = 'Invitation_dev',
  GUEST_TABLE = 'Guest_dev'
}

export default db;
