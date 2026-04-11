
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database.js";
import productRoutes from "./routes/product.routes.js"
import cors from "cors"
import errorHandler from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";





const app = express();

await connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://products-api-opal.vercel.app"
  ],
  // credentials: true
}));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use("/api/products", productRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});