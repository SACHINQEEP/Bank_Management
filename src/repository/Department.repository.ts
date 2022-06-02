import { AppDataSource } from "../data-source";
import { Department } from "../entity/Department";

function repo() {
  return AppDataSource.getRepository(Department);
}

export const getDepartment = async (id: any): Promise<Department> => {
  return await repo().findOneByOrFail(id);
};

export const addDepartment = async (body: object): Promise<Department> => {
  return await repo().create(body).save();
};
