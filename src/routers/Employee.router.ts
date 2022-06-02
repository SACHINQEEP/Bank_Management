import * as express from "express";
import EmployeeController from "../controllers/Employee.controller";
import { checkJWTEM } from "../middleware/checkJWT";
import EmployeeService from "../services/Employee.service";

const EmployeeRouter = express.Router();

const controller = new EmployeeController(new EmployeeService());

EmployeeRouter.post("/signup", async (req, res) => {
  try {
    const responce = await controller.signup(req.body);

    res.status(200).json({
      status: "Success",
      message: "You have Successfully registered",
      data: responce,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
});

EmployeeRouter.post("/login", async (req, res) => {
  try {
    const responce = await controller.login(req.body);

    res.status(200).json({
      status: "Success",
      message: "You have Login",
      data: responce,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
});

EmployeeRouter.post("/add-account", checkJWTEM, async (req, res) => {
  try {
    const responce = await controller.addAccount(req.body);

    res.status(200).json({
      status: "Success",
      message: "Account succesfully created!!.",
      data: responce,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
});

export default EmployeeRouter;
