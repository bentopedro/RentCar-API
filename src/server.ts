import express from "express";
import swaggerUi from "swagger-ui-express";

import "./database";

import "./shared/container";

import { userAuth } from "./routes/authenticate.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";
import { userRoutes } from "./routes/users.routes";
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(categoriesRoutes);
app.use(specificationsRoutes);
app.use(userRoutes);
app.use(userAuth);

/*
PODEMOS PASSAR O NOME DO PRODUCT AQUI MESMO, COMO AQUI E RETIRA-LO NO ROUTES
// app.use(categoriesRoutes); 
// app.use("/categories", categoriesRoutes); 
*/

app.listen(3333, () => console.log("server running"));
