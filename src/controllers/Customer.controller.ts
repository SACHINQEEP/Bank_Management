import { Body, Post, Route, Security, Tags } from "tsoa";
import { Customer } from "../entity/Customer";
import IUser from "../interface/Request/IUser";
import { LoginPayload } from "../interface/Request/LoginPayload";
import { UserRequest } from "../interface/Request/UserRequest";
import { ICustomer } from "../interface/Responce/ICustomer";
import CoustomerServic from "../services/Coustomer.service";

@Route("/customer")
@Tags("Customer")
export default class CustomerController {
  private coustomerservic: CoustomerServic;

  constructor(coustomerServic: CoustomerServic) {
    this.coustomerservic = coustomerServic;
  }

  // @Security("Authontication")
  @Post("/signup")
  public async signup(@Body() body: UserRequest): Promise<ICustomer> {
    return this.coustomerservic.createCustomer(body);
  }

  @Post("/login")
  public async login(@Body() body: LoginPayload): Promise<ICustomer> {
    return this.coustomerservic.getCustomer(body);
  }

  @Security("authorization")
  @Post("/get-user-details")
  public async getUserDetails(@Body() body: IUser): Promise<Customer> {
    return this.coustomerservic.getUserData(body);
  }

  @Security("authorization")
  @Post("/transection")
  public async getUserTransection(
    @Body() body: IUser
  ): Promise<Customer | any> {
    return this.coustomerservic.checkTransection(body);
  }
}
