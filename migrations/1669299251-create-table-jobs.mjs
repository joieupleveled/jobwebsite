export async function up(sql) {
  await sql`
 CREATE TABLE jobs (
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	company varchar(50) NOT NULL,
	title varchar(50),
	type varchar(50),
	salary integer,
	description varchar(500)
 )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE jobs
  `;
}
