import { client } from "./config.js";

export const createUserMetrics = async (userMetrics) => {
  const result = await client.query(
    `insert into usersMetrics ("userId", gender, wind, height, temperature) values ($1,$2,$3,$4,$5) retuning id`,
    [userMetrics.userId, userMetrics.gender, userMetrics.heights, userMetrics.temperature]
  );
  return result.rows[0]?.id;
};

export const findUserMetricsById = async (id) => {
  const result = await client.query(
    `select id, gender, wind, height, temperature from usersMetrics where id = $1`,
    [id]
  );
  return result.rows[0];
}; 