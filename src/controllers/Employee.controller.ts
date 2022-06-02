import { Body, Post, Route, Security, Tags } from "tsoa";
import { Accounts } from "../entity/Accounts";
import { AccountPayload } from "../interface/Request/addAccountPayload";
import { EmployeePayload } from "../interface/Request/EmployeePayload";
import { LoginPayload } from "../interface/Request/LoginPayload";
import { IEmployee } from "../interface/Responce/IEmployee";
import EmployeeService from "../services/Employee.service";

@Route("/employee")
@Tags("Employee")
export default class EmployeeController {
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  @Post("/signup")
  public async signup(@Body() body: EmployeePayload): Promise<IEmployee> {
    return this.employeeService.createEmployee(body);
  }

  @Post("/login")
  public async login(@Body() body: LoginPayload): Promise<IEmployee> {
    return this.employeeService.getEmployees(body);
  }

  @Security("authorization")
  @Post("/add-account")
  public async addAccount(@Body() body: AccountPayload): Promise<Accounts> {
    return this.employeeService.createCustomerAccount(body);
  }
}
