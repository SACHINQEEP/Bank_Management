import { Body, Post, Route, Tags } from "tsoa";
import { Department } from "../entity/Department";
import DepartmentService from "../services/Department.service";

@Route("/bank-department")
@Tags("Department")
export default class DepartmentController {
  private departmentService: DepartmentService;

  constructor(departmentService: DepartmentService) {
    this.departmentService = departmentService;
  }

  @Post("/")
  public async addDepartment(@Body() body: object): Promise<Department> {
    return this.departmentService.department(body);
  }
}
