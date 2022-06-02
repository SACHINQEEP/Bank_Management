import * as express from "express";
import branchRouter from "./branch.router";
import CoustomerRouter from "./Coustomer.router";
import departmentRouter from "./department.router";
import EmployeeRouter from "./Employee.router";

const router = express.Router();

router.use("/customer", CoustomerRouter);
router.use("/employee", EmployeeRouter);
router.use("/bank-branch", branchRouter);
router.use("/bank-department", departmentRouter);

export default router;
