create table users (
  id serial PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  "hashedPassword" TEXT NOT NULL
);

