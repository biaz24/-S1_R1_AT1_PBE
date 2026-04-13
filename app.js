import express from "express";
import ProdutosRoutes from "./routes/product.routes.js";

import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

import CategoriaRoutes from "./routes/category.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// http://localhost:3000/produtos
app.use("/produtos", ProdutosRoutes);

// http://localhost:3000/categoria
app.use("/categoria", CategoriaRoutes);

app.use(errorHandler);
export default app;
