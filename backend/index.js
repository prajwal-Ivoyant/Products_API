import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import productRoutes from "./src/routes/product.routes.js"
import errorHandler from "./src/middleware/error.middleware.js"



dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});