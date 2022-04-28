import { client } from "./config.js";

export const createUserPreferences = async (userPreferences) => {
  const result = await client.query(
    `insert into usersPreferences ("userId", language, countries, city) values ($1, $2, $3, $4) returning id`,
    [userPreferences.userId, userPreferences.language, userPreferences.countries, userPreferences.city]
  );
  return result.rows[0]?.id;
};

export const findUserPreferencesById = async (id) => {
  const result = await client.query(
    `select id, language, countries, city from usersPreferences where id = $1`,
    [id]
  );
  return result.rows[0];
};

