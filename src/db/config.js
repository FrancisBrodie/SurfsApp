import pg from "pg";
export const client = new pg.Client({
  host: "localhost",
  port: 5432,
  database: "surfs_app",
});
client.connect();
