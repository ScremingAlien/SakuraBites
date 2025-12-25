import express from "express";
import cors from "cors";

import notFound from "./middlewares/default/notFound.js";
import errorHandler from "./middlewares/default/errorHandler.js";
import morgan from "morgan";
import helmet from "helmet";
import { responseFormatter } from "./middlewares/default/responseFormater.js";
import connectDB from "./config/db.js";

// import your routes here from src/modules 
import userRoutes from "./modules/user/user.routes.js";
import recipeRoutes from "./modules/recipe/recipe.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import feedbackRoutes from "./modules/feedback/feedback.routes.js";

import compression from "compression";

const app = express();

// default middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(compression());

connectDB();

app.use(responseFormatter);

// inject your routes here
 
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/feedback", feedbackRoutes);


app.use(notFound);
app.use(errorHandler);

export default app;
