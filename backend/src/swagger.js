// const swaggerJsdoc = require("swagger-jsdoc");
import swaggerJsdoc from "swagger-jsdoc";

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
        url: "http://localhost:5000/api/products",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // where your APIs are written
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;