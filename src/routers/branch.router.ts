import express = require("express");
import BranchController from "../controllers/Branch.controller";
import BranchService from "../services/Branch.service";

const branchRouter = express.Router();

const controller = new BranchController(new BranchService());

branchRouter.post("/add-branch", async (req, res) => {
  try {
    const responce = await controller.addBranch(req.body);

    res.status(200).json({
      status: "Success",
      message: "Branch Created!!",
      data: responce,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
});

export default branchRouter;
