import { Body, Post, Route, Security, Tags } from "tsoa";
import { Accounts } from "../entity/Accounts";
import { Employees } from "../entity/Employee";
import { AccountPayload } from "../interface/Request/addAccountPayload";
import { EmployeePayload } from "../interface/Request/EmployeePayload";
import { LoginPayload } from "../interface/Request/LoginPayload";
import { VerifyOTP } from "../interface/Request/VerifyOTP";
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
  
  @Security("authorization")
  @Post("/verify-otp")
  public async verifyOTP(@Body() Body: VerifyOTP):Promise<Employees> {
    return this.employeeService.verifyOTP(Body);
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
