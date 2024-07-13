import "dotenv/config";

export const POCKETBASE_URL = process.env.POCKETBASE_URL;
export const PORT = process.env.PORT;
export const DEPLOY_URL = process.env.DEPLOY_URL;
export const QUEUE_URL = process.env.QUEUE_URL;
export const EMAIL_FROM = process.env.EMAIL_FROM;
export const EMAIL_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
export const EMAIL_SERVER_PORT = Number(process.env.EMAIL_SERVER_PORT);
export const EMAIL_SERVER_USER = process.env.EMAIL_SERVER_USER;
export const EMAIL_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
