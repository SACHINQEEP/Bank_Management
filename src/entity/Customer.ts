import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { BaseEntry } from "../utils/BaseEntry";
import { Accounts } from "./Accounts";
import { Transection } from "./Transection";

@Entity()
export class Customer extends BaseEntry {
  @OneToOne(() => Accounts)
  @JoinColumn({
    name: "account_id",
  })
  account_id: Accounts;

  @OneToMany(() => Transection, (transection) => transection.customer_id)
  @JoinColumn({
    name: "transection_id",
  })
  transection_id: Transection[];
}
