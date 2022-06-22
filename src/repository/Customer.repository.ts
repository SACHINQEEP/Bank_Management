import { UpdateResult } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Customer } from '../entity/Customer'

function repo () {
  return AppDataSource.getRepository(Customer)
}

export const getCustomer = async (id: any): Promise<Customer> => {
  return await repo().findOneByOrFail(id)
}

export const getUser = async (payload: any): Promise<Customer> => {
  return await repo().findOne({ ...payload })
}

export const getDetails = async (id: any): Promise<Customer> => {
  return await repo().findOne({
    where: { id: id },
    relations: ['account_id']
  })
}

export const addCustomer = async (body: object): Promise<Customer> => {
  return await repo()
    .create(body)
    .save()
}

export const updateCustomer = async (
  user: any,
  body: object
): Promise<UpdateResult> => {
  return await repo().update({ ...user }, { ...body })
}

export const getTransection = async (body: any): Promise<[Customer[], any]> => {
  return repo().findAndCount({
    where: {
      id: body.id
    },
    skip: body.offset ? body.offset : 0,
    take: body.limit ? body.limit : 10,
    order: {
      id: 'DESC'
    },
    select: [
      'id',
      'name',
      'email',
      'branch_id',
      'account_number',
      'total_amount'
    ],
    relations: ['transection_id', 'deposit_id']
  })
}
