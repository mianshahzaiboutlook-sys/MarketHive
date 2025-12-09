import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "./config.js";

const dbConfig = () => {
    mongoose
        .connect(DB_CONNECTION_STRING)
        .then((conn) => console.log(`Database connected: ${conn.connection.host}`))
        .catch((err) => console.log(`Database connection Failed: ` + err));
};

export default dbConfig;
 
