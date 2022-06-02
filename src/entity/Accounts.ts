import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account_status } from "../eumn/AccountStatus";
import { Account_type } from "../eumn/AccountType";
import { Customer } from "./Customer";

@Entity()
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  account_number: string;

  @Column()
  branch_id: string;

  @Column()
  customer_id: string;

  @Column({
    type: "enum",
    enum: Account_type,
    default: Account_type.SAVING,
  })
  account_type: string;

  @Column({
    type: "enum",
    enum: Account_status,
    default: Account_status.ACTIVE,
  })
  account_status: string;
}
