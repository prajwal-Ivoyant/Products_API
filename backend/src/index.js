import dotenv from "dotenv";
dotenv.config(); // ✅ Must be called immediately after import, before anything else

import express from "express";
import connectDB from "./config/database.js";
import productRoutes from "./routes/product.routes.js";
import cors from "cors";
import errorHandler from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const startServer = async () => {
  // ✅ Await DB connection before starting the server
  await connectDB();

  const app = express();

  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://products-api-opal.vercel.app",
        "https://productsapi-production-0a2c.up.railway.app"
      ],
    })
  );

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(express.json());
  app.use("/api/products", productRoutes);
  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer();
