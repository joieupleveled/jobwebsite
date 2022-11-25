const jobs = [
  {
    company: 'Webdefy',
    title: 'Web Developer',
    type: 'fulltime',
    salary: 40000,
    description: 'lorem ipsum',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO jobs ${sql(jobs, 'company', 'title', 'salary', 'description')}
  `;
};

exports.down = async (sql) => {
  for (const job of jobs) {
    await sql`
      DELETE FROM
        jobs
      WHERE
      company = ${job.company} AND
      title = ${job.title} AND
      type= ${job.type} AND
      salary = ${job.salary} AND
      description = ${job.description}
    `;
  }
};
