exports.up = async (sql) => {
  await sql`
 CREATE TABLE jobs (
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	company varchar(50) NOT NULL,
	title varchar(50),
  type varchar(50),
  location varchar (50),
	salary integer,
  description varchar(500)
 )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE jobs
  `;
};
