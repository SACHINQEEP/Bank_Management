import { AppDataSource } from "../data-source";
import { Branch } from "../entity/BankBranch";

function repo() {
  return AppDataSource.getRepository(Branch);
}

export const getBranch = async (id: any): Promise<Branch> => {
  return await repo().findOneByOrFail(id);
};

export const createBranch = async (body: object): Promise<Branch> => {
  return await repo().create(body).save();
};
