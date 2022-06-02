import { AppDataSource } from "../data-source";
import { Transection } from "../entity/Transection";

function repo() {
  return AppDataSource.getRepository(Transection);
}

export const addTransection = async (body: object): Promise<Transection> => {
  return await repo().create(body).save();
};

export const getTransection = async (
  body: any
): Promise<Array<Transection[] | number>> => {
  return await repo().findAndCount({
    where: {
      id: body.id,
    },
    skip: body.offset ? body.offset : 0,
    take: body.limit ? body.limit : 10,
    order: {
      id: "ASC",
    },
    relations: ["customer_id"],
  });
};
