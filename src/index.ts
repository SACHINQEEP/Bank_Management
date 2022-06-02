import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import * as env from "dotenv";
import router from "./routers/index";
import * as swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.yaml",
    },
  })
);

app.use(cors);

env.config();

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
  })
  .catch((error) => console.log(error));

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: `Can't find the ${req.originalUrl}`,
  });
  next();
});

app.use(
  (
    err,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listed on port ${port}`));
