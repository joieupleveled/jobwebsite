exports.up = async (sql) => {
  await sql`
  CREATE TABLE sessions (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL REFERENCES users(id),
    token varchar(300) NOT NULL UNIQUE,
    expiry_timestamp timestamp NOT NULL DEFAULT NOW(),
    csrf_secret varchar(300) NOT NULL UNIQUE
  )`;
};

exports.down = async (sql) => {
  await sql`
  DROP TABLE sessions`;
};
