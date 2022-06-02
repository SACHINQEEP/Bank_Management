import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Loan extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    loan_id: string

    @Column()
    account_number: string

    @Column()
    interest_rate: number

    @Column()
    duration: string

    @Column()
    start_date: Date

    @Column()
    due_amount: number
}