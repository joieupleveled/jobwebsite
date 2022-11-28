import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getJobById, Job } from '../../database/jobs';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

// const foundJob = {
//   id: 1,
//   title: 'Developer',
//   company: 'Upleveld',
//   salary: 40000,
//   description: 'testdescription',
//   type: 'full-time',
// };

// const jobStyles = css`
//   border-radius: 20%;
//   border: 1px solid #ccc;
//   padding: 20px;

//   h2 {
//     margin-top: 0;
//   }

//   & + & {
//     margin-top: 25px;
//   }
// `;

type Props =
  | {
      job: Job;
    }
  | {
      error: string;
    };

export default function SingleJob(props: Props) {
  console.log(props);
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
  return (
    <div>
      <Head>
        {props.job.title}, the {props.job.company}
      </Head>

      <h2>{props.job.title}</h2>
      <div>Id: {props.job.company}</div>
      <div>Title: {props.job.title}</div>
      <div>Type: {props.job.type}</div>
      <div>Location: {props.job.location}</div>
      <div>Salary: {props.job.salary}</div>
      <div>Description: {props.job.description}</div>
      <div>
        <button className="btn-primary">Apply now</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const jobId = parseIntFromContextQuery(context.query.jobsId);
  console.log('jobId', jobId);
  console.log('context', context.query);
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
  console.log(foundJob);
  return {
    props: {
      job: foundJob,
    },
  };
}
