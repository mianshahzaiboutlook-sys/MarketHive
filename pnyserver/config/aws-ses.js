import SES from "aws-sdk/clients/ses.js";
import dotenv from "dotenv";
dotenv.config();

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION || "eu-north-1";
const AWS_VERSION = process.env.AWS_VERSION || "2010-12-01";

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "no-reply@example.com";

const awsconfig = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  version: AWS_VERSION,
};

export const AWSSES = new SES(awsconfig);
