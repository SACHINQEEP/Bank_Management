import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "./entity/User"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: 3306,
  username: "root",
  password: "bigbang@1330",
  database: "bank_management",
  synchronize: true,
  logging: ["error", "warn"],
  entities: ["src/entity/**/*.ts"],
  migrations: [],
  subscribers: [],
});
