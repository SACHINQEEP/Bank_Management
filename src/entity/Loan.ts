import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Loan extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  loan_id: string

  @Column()
  first_name: string

  @Column()
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

  @Column()
  branch_name: string

  @Column({
    unique: true
  })
  email_id: string

  @Column()
  account_number: string

  @Column()
  mobile_number: string

  @Column()
  aadhar_card_number: string

  @Column()
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

  @Column()
  amount_requested: number

  @Column()
  interest_rate: number

  @Column()
  loan_duration: string

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column()
  time_period: Date

  @Column()
  due_amount: number
}
