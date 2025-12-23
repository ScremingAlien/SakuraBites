import compression from "compression";
import cors from "cors";
import type { Application } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "@/config/db";
import errorHandler from "@/middlewares/default/errorHandler";
import notFound from "@/middlewares/default/notFound";
import { responseFormatter } from "@/middlewares/default/responseFormatter";

// import your routes here from src/modules
// import todoRoutes from "@/modules/todo/todo.routes";

const app: Application = express();

// default middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(compression());

connectDB();


app.use(responseFormatter);

// inject your routes here
// app.use("/api/v1/todo", todoRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
