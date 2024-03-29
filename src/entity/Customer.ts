import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { BaseEntry } from '../utils/BaseEntry'
import { Accounts } from './Accounts'
import { Deposits } from './Deposit_Transecton'
import { Loan } from './Loan'
import { Transection } from './Transection'

@Entity()
export class Customer extends BaseEntry {
  @Column({
    nullable: true
  })
  stripe_id: string

  @Column({ nullable: true })
  total_amount: number

  @Column({ default: null })
  account_pincode: string

  @OneToOne(() => Accounts)
  @JoinColumn({
    name: 'account_id'
  })
  account_id: Accounts

  @OneToMany(
    () => Transection,
    transection => transection.customer_id
  )
  @JoinColumn({
    name: 'transection_id'
  })
  transection_id: Transection[]

  @OneToMany(
    () => Deposits,
    deposit => deposit.customer_id
  )
  @JoinColumn({
    name: 'deposit_id'
  })
  deposit_id: Deposits[]

  @OneToOne(() => Loan)
  @JoinColumn({
    name: 'loan_id'
  })
  loan_id: Loan[]
}
