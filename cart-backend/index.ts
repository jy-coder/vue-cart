import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./src/middlewares/errors";
import { json } from "body-parser";
import cartRoute from "./src/routes/cartRoute";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(json());

app.use("/cart", cartRoute);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to Express & TypeScript Server");
// });

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
