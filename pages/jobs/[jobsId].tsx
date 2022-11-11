import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getJobById, Job } from '../../database/jobs';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

const jobStyles = css`
  border-radius: 20%;
  border: 1px solid #ccc;
  padding: 20px;

  h2 {
    margin-top: 0;
  }

  & + & {
    margin-top: 25px;
  }
`;

type Props =
  | {
      job: Job;
    }
  | {
      error: string;
    };

//
export default function SingleJob(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Job not found</title>
          <meta name="description" content="Jobs not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/jobs">jobs page</Link>
      </div>
    );
  }
  //
  return (
    <div css={jobStyles}>
      <Head>
        <title>
          {props.job.title}, the {props.job.company}
        </title>
      </Head>

      <h2>{props.job.title}</h2>
      <div>Id: {props.job.company}</div>
      <div>Type: {props.job.type}</div>
      <div>Type: {props.job.salary}</div>
      <div>Type: {props.job.description}</div>
    </div>
  );
}

export async function getServersideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const jobId = parseIntFromContextQuery(context.query.jobId);

  if (typeof jobId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Job not found',
      },
    };
  }

  const foundJob = await getJobById(jobId);

  if (typeof foundJob === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Job not found',
      },
    };
  }

  return {
    props: {
      job: foundJob,
    },
  };
}
