import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branch extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: any;

  @Column()
  branch_name: string;

  @Column({
    unique: true,
  })
  branch_location: string;

  @Column()
  branch_city: string;

  @Column({
    length: 10,
  })
  branch_phone_number: string;

  @Column()
  manager_id: number;
}
