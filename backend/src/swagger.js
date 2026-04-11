import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";

// ✅ Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        // ✅ Dynamic server URL — works in both local and deployed environments
        url: process.env.API_BASE_URL || "http://localhost:5000/api/products",
      },
    ],
  },
  // ✅ Absolute path so it resolves correctly regardless of where node is run from
  apis: [path.join(__dirname, "routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
