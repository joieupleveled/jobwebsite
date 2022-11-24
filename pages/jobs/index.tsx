import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getJobs, Job } from '../../database/jobs';

const jobStyles = css`
  border: 1px solid #ccc;
  padding: 20px;
  flex-direction: row;

  h2 {
    margin-top: 0;
  }

  & + & {
    margin-top: 25px;
  }
`;

type Props = {
  jobs: Job[];
};

export default function Jobs(props: Props) {
  return (
    <div>
      <Head>
        <title>Jobs</title>
        <meta name="Description" content="List page of all jobs" />
      </Head>
      <h1>Listed Jobs</h1>

      {props.jobs.map((job) => {
        return (
          <div
            data-test-id={`job-type-${job.type}`}
            key={`job-${job.id}`}
            css={jobStyles}
          >
            <h2>
              <Link href={`/jobs/${job.id}`}>{job.title}</Link>
            </h2>

            <h3>Company: {job.company}</h3>
            <span>Job Type: {job.type}</span>
            <span>Job Description: {job.description}</span>
            <p>Annual Salary: EUR {job.salary}</p>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const jobs = await getJobs();
  return {
    // Anything that you write in this props object
    // will become the props that are passed to
    // the `Animals` page component above
    props: {
      // First prop, containing all animals
      jobs: jobs,
      // Second prop, example
      // abc: 123,
    },
  };
}
