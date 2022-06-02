import { Column, Entity } from "typeorm";
import { BaseEntry } from "../utils/BaseEntry";

@Entity()
export class Employees extends BaseEntry {
  @Column()
  department: string;

  @Column()
  department_id: string;
}
