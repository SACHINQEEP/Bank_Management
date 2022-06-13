import { Customer } from '../../entity/Customer'
import { Transection } from '../../entity/Transection'

export interface ITransection {
  id: Customer['id']
  name: Customer['name']
  email: Customer['email']
  branch_id: Customer['branch_id']
  account_number: Customer['account_number']
  total_amount: Customer['total_amount']

  transection_id: Transection
}
