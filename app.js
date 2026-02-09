import express from 'express';
import ProdutosRoutes from './routes/ProdutosRoutes.js'

import CategoriaRoutes from './routes/CategoriaRoutes.js'

const app = express();
app.use(express.json());

// http://localhost:3000/produtos
app.use("/produtos", ProdutosRoutes);

// http://localhost:3000/categoria
app.use("/categoria", CategoriaRoutes);


export default app;