import { Department } from "../entity/Department";
import { addDepartment } from "../repository/Department.repository";

export default class DepartmentService {
  public async department(body: object): Promise<Department> {
    let user = addDepartment(body);

    return user;
  }
}
