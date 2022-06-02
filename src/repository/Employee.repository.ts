import { UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Employees } from "../entity/Employee";

function repo() {
  return AppDataSource.getRepository(Employees);
}

export const getEmployee = async function (id: any): Promise<Employees> {
  return await repo().findOneByOrFail({ id });
};

export const addEmployee = async (body: object): Promise<Employees> => {
  return await repo().create(body).save();
};

export const updateEmployee = async function (
  user: any,
  body: object
): Promise<UpdateResult> {
  return await repo().update({ ...user }, { ...body });
};
