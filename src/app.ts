import express from "express";
import body from "body-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import user from "./routes/user";
import post from "./routes/post";

// Setting up config file
dotenv.config({ path: path.resolve(__dirname, "./config/.env") })

const app = express();

app.use(body.json());
app.use(body.urlencoded({ extended: true }));
app.use(cookieParser());

// middleware for cors
const allowedOrigins = [
    'http://localhost:3000'
];

app.use(cors(
    {
        origin: allowedOrigins,
        methods: "GET, POST, PUT, DELETE",
        credentials: true
    }
));

app.use("/api", user)
app.use("/api", post)

// Error handler
app.use(errorMiddleware);

export default app;