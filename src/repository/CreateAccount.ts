import { AppDataSource } from "../data-source";
import { Accounts } from "../entity/Accounts";
import { AccountPayload } from "../interface/Request/addAccountPayload";

function repo() {
  return AppDataSource.getRepository(Accounts);
}

export const addAccount = function (body: AccountPayload): Promise<Accounts> {
  return repo().create(body).save();
};

export const getAccount = function (id: any): Promise<Accounts> {
  return repo().findOneBy({ id });
};
