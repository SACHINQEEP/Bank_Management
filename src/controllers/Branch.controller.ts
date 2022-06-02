import { Body, Post, Route, Tags } from "tsoa";
import { Branch } from "../entity/BankBranch";
import { BranchPayload } from "../interface/Request/BranchPayload";
import BranchService from "../services/Branch.service";

@Route("/bank-branch")
@Tags("Branch")
export default class BranchController {
  private branchService: BranchService;

  constructor(branchService: BranchService) {
    this.branchService = branchService;
  }

  @Post("/add-branch")
  public async addBranch(@Body() body: BranchPayload): Promise<Branch> {
    return this.branchService.branch(body);
  }
}
