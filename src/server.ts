import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json());

app.use(categoriesRoutes);

/*
PODEMOS PASSAR O NOME DO PRODUCT AQUI MESMO, COMO AQUI E RETIRA-LO NO ROUTES
// app.use(categoriesRoutes); 
// app.use("/categories", categoriesRoutes); 
*/

app.listen(3333, () => console.log("server running"));
