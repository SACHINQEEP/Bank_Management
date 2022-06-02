import { Branch } from "../entity/BankBranch";
import { BranchPayload } from "../interface/Request/BranchPayload";
import { createBranch, getBranch } from "../repository/Branch.repository";

export default class BranchService {
  public async branch(body: BranchPayload): Promise<Branch> {
    let user = await createBranch(body);

    user = await getBranch({ id: user.id });

    return user;
  }
}
