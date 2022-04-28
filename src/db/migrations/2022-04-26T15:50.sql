create table userPreferences (
  id serial PRIMARY KEY,
  language TEXT NOT NULL,
  countries TEXT NOT NULL,
  city TEXT NOT NULL, 
  "userId" INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES users(id)
);

