import express from "express";
import { createConnection } from "mysql";
import cors from "cors";

import appRoutes from "./routes/index.js";

const app = express();
const secretKey = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(appRoutes);

app.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Servidor Express en http://localhost:${PORT}`);
});
