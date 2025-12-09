
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
export const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/pny";
export const SALT_ROUNDS = process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10;
export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1h";
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";