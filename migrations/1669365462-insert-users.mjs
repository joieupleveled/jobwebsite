const users = [
  {
    username: 'shawn',
    first_name: 'shawn',
    last_name: 'morton',
    password_hash: 'shawnmorton',
  },
];

export async function up(sql) {
  await sql`
    INSERT INTO users ${sql(
      users,
      'username',
      'first_name',
      'last_name',
      'password_hash',
    )}
  `;
}

export async function down(sql) {
  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
        username = ${user.username} AND
        first_name = ${user.first_name} AND
        last_name= ${user.last_name} AND
        password_hash = ${user.password_hash}
    `;
  }
}
