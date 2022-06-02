import { Accounts } from "../entity/Accounts";
import { AccountPayload } from "../interface/Request/addAccountPayload";
import { EmployeePayload } from "../interface/Request/EmployeePayload";
import { LoginPayload } from "../interface/Request/LoginPayload";
import { IEmployee } from "../interface/Responce/IEmployee";
import AppError from "../middleware/AppError";
import { addAccount, getAccount } from "../repository/CreateAccount";
import { getCustomer, updateCustomer } from "../repository/Customer.repository";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../repository/Employee.repository";
import { jwtWebToken } from "../utils/util";

export default class EmployeeService {
  public async createEmployee(body: EmployeePayload): Promise<IEmployee> {
    let user = await addEmployee(body);

    user = await getEmployee(user.id);

    const token = jwtWebToken({ id: user.id });

    return { user, token };
  }

  public async getEmployees(body: LoginPayload): Promise<IEmployee> {
    let user = await getEmployee({ email: body.email });
    console.log(user);

    if (!user) {
      throw new AppError(400, "User not Found");
    }

    await updateEmployee({ id: user.id }, { Update_At: new Date() });

    const token = jwtWebToken({ id: user.id });

    return { user, token };
  }

  public async createCustomerAccount(body: AccountPayload): Promise<Accounts> {
    let users = await getCustomer(body.customer_id);

    if (!users.account_number) {
      let user = await addAccount(body);

      await getCustomer(user.customer_id);

      await updateCustomer(
        { id: user.customer_id },
        { account_number: user.account_number, account_id: user.id }
      );

      user = await getAccount(user.id);

      return user;
    }

    throw new AppError(400, "Account number already exist");
  }
}
