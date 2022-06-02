import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payment_type } from "../eumn/PaymentType";
import { Customer } from "./Customer";

@Entity()
export class Transection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_number: string;

  @Column({
    type: "datetime",
    default: () => "NOW()",
  })
  @Index()
  createdAt: string;

  @Column({
    type: "enum",
    enum: Payment_type,
    default: null,
  })
  payment_type: string;

  @Column({
    nullable: true,
    unique: true,
  })
  loan_id: string;

  @Column()
  transection_type: string;

  @ManyToOne(() => Customer, (customer) => customer.transection_id)
  @JoinColumn({ name: "customer_id" })
  customer_id: Customer;
}
