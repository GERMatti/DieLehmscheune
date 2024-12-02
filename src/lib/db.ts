import pkg from "pg";
const { Pool } = pkg;
import { env } from "$env/dynamic/private";

const pool = new Pool({
  host: env.PRIVATE_POSTGRES_HOST, // Postgres ip address[s] or domain name[s]
  port: Number(env.PRIVATE_POSTGRES_PORT), // Postgres server port[s]
  database: env.PRIVATE_POSTGRES_DB, // Name of a database to connect to
  user: env.PRIVATE_POSTGRES_USER, // Username of database user
  password: env.PRIVATE_POSTGRES_PASSWORD, // Password of database user
});
/*
 * Connect to the PostgreSQL database.
 * @returns {Promise<import("pg").Client>} A new client from the connection pool.
 */
export const connectToDB = () => pool.connect();
