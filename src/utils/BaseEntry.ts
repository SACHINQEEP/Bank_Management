import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { IsEmail } from "class-validator";

@Entity()
export class BaseEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({
    length: 10,
  })
  phone: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  password?: string;

  @Column({
    default: null
  })
  otp: string;

  @Column()
  branch_id: string;

  @Column({
    nullable: true,
  })
  account_number: string;

  @Column({
    type: "datetime",
    default: () => "NOW()",
  })
  Update_At: Date;
}
