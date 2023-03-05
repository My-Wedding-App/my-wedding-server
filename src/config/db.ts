import AWS from "aws-sdk";

AWS.config.update({
  region: 'us-west-1'
});

const db = new AWS.DynamoDB.DocumentClient();

export enum Tables {
  INVITATION_TABLE = 'Invitation_dev',
  GUEST_TABLE = 'Guest_dev'
}

export default db;
