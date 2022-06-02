import * as express from "express";
import DepartmentController from "../controllers/Department.conroller";
import DepartmentService from "../services/Department.service";

const departmentRouter = express.Router();
const controller = new DepartmentController(new DepartmentService());

departmentRouter.post("/", async (req, res) => {
  try {
    const responce = await controller.addDepartment(req.body);

    res.status(200).json({
      status: "Success",
      message: "Branch Department Created!!",
      data: responce,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
});

export default departmentRouter;
