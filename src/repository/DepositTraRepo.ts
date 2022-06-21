import { AppDataSource } from '../data-source'
import { Deposits } from '../entity/Deposit_Transecton'

function repo () {
  return AppDataSource.getRepository(Deposits)
}

export const getDeposits = async (body: object): Promise<Deposits> => {
  return await repo()
    .create(body)
    .save()
}
