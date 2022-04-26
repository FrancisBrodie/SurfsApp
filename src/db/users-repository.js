import { hashPassword } from "../utils/crypto.js";
import { client } from "./config.js";

export const createUser = async (user) => {
  const hashedPassword = hashPassword(user.password);
  const result = await client.query(
    `insert into users (email, "hashedPassword") values ($1, $2) returning id`,
    [user.email, hashedPassword]
  );
  return result.rows[0]?.id;
};

export const findUserById = async (id) => {
  const result = await client.query(
    `select id, email, "hashedPassword" from users where id = $1`,
    [id]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await client.query(
    `select id, email, "hashedPassword" from users where email = $1`,
    [email]
  );

  return result.rows[0];
};
