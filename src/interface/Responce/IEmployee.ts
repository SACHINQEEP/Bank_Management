import { Employees } from "../../entity/Employee";

export interface IEmployee {
  user: Employees;
  token: string;
}
