import { UpdateResult } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Loan } from '../entity/Loan'

function repo () {
  return AppDataSource.getRepository(Loan)
}

export const getLoanDetails = async (id: any): Promise<Loan> => {
  return await repo().findOneByOrFail(id)
}

export const createLoan = async (body: object): Promise<Loan> => {
  return await repo()
    .create(body)
    .save()
}

export const updateLoan = async (
  user: any,
  body: object
): Promise<UpdateResult> => {
  return await repo().update({ ...user }, { ...body })
}
