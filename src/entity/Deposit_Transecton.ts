import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Payment_type } from '../eumn/PaymentType'
import { TransetionType } from '../eumn/TransectionType'
import { Customer } from './Customer'

@Entity()
export class Deposits extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  account_number: string

  @Column()
  amount: number

  @Column({
    type: 'enum',
    enum: Payment_type,
    default: Payment_type.DEPOSIT
  })
  payment_type: string

  @Column({
    nullable: true,
    unique: true
  })
  loan_id: string

  @Column({
    type: 'enum',
    enum: TransetionType,
    default: TransetionType.UPI
  })
  transection_type: string

  @Column({
    nullable: true
  })
  recever_customer_account_number: string

  @Column({
    nullable: true
  })
  recever_customer_mobile_number: string

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  @Index()
  createdAt: string

  @ManyToOne(
    () => Customer,
    customer => customer.deposit_id
  )
  @JoinColumn({ name: 'customer_id' })
  customer_id: Customer
}
