create table usersMetrics (
  id serial PRIMARY KEY, 
  gender TEXT NOT NULL, 
  wind TEXT NOT NULL, 
  height TEXT NOT NULL, 
  temperature TEXT NOT NULL, 
  "userId" INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY("uderId") REFERENCES users(id)
); 

