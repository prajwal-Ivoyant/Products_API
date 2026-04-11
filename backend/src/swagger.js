// const swaggerJsdoc = require("swagger-jsdoc");
import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Products API",
      version: "1.0.0",
      description: "API documentation for your project",
    },
    servers: [
      {
        url: process.env.API_BASE_URL,
      },
    ],
  },
apis: [path.join(__dirname, "routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;