import * as express from "express";
import CustomerController from "../controllers/Customer.controller";
import { checkJWTCS } from "../middleware/checkJWT";
import CoustomerService from "../services/Coustomer.service";

const CoustomerRouter = express.Router();

const controller = new CustomerController(new CoustomerService());

CoustomerRouter.post("/signup", async (req, res) => {
  try {
    const responce = await controller.signup(req.body);

    return res.status(200).json({
      status: "Success",
      message: "You have Successfully registered",
      data: responce,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
});

CoustomerRouter.post("/login", async (req, res) => {
  try {
    const responce = await controller.login(req.body);

    return res.status(200).json({
      status: "Success",
      message: "You have login",
      data: responce,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
});
CoustomerRouter.post("/get-user-details", checkJWTCS, async (req, res) => {
  try {
    const responce = await controller.getUserDetails(req.body);

    return res.status(200).json({
      status: "Success",
      message: "Your Details",
      data: responce,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
});

CoustomerRouter.post("/transection", checkJWTCS, async (req, res) => {
  try {
    const responce = await controller.getUserTransection(req.body);

    return res.status(200).json({
      status: "Success",
      message: "Transection Details",
      data: responce,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
});

export default CoustomerRouter;
