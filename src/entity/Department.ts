import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  department_id: any;

  @Column()
  department_name: string;

  @Column()
  head_of_department: string;

  @Column()
  discription: string;
}
