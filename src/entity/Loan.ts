import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { LoanType } from '../eumn/LoanType'
import { Customer } from './Customer'

@Entity()
export class Loan extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  loan_id: string

  @Column({
    type: 'enum',
    enum: LoanType,
    default: LoanType.BIKE_LOAN
  })
  loan_type: string

  @Column({
    nullable: true
  })
  first_name: string

  @Column({
    nullable: true
  })
  last_name: string

  @Column({
    type: 'simple-json',
    nullable: true
  })
  family_details: {
    father_name: string
    mother_name: string
    occupation: string
  }

  @Column({
    nullable: true
  })
  branch_name: string

  @Column({
    unique: true
  })
  email_id: string

  @Column({
    nullable: true
  })
  account_number: string

  @Column({
    nullable: true
  })
  mobile_number: string

  @Column({
    nullable: true
  })
  aadhar_card_number: string

  @Column({
    nullable: true
  })
  pan_card_number: string

  @Column({
    type: 'simple-json',
    nullable: true
  })
  docs: {
    aadhar_card: string
    pan_card: string
    address_proof: string
    transection_history: string
  }

  @Column({
    type: 'simple-json',
    nullable: true
  })
  aadress: {
    line: string
    near_by: string
    pin_code: number
    city: string
    state: string
  }

  @Column({
    nullable: true
  })
  amount_requested: number

  @Column({
    nullable: true
  })
  interest_rate: number

  @Column({
    nullable: true
  })
  loan_duration: string

  @Column({
    nullable: true
  })
  start_date: Date

  @Column({
    nullable: true
  })
  end_date: Date

  @Column({
    nullable: true
  })
  time_period: Date

  @Column({
    nullable: true
  })
  due_amount: number

  @OneToOne(() => Customer)
  @JoinColumn({
    name: 'customer_id'
  })
  customer_id: Customer
}
