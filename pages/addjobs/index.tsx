import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../../database/sessions';
import { AddjobResponseBody } from '../api/addjob';
import addJobsStyles from './addJobsStyles.module.css';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function AddJob(props: Props) {
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function addjobHandler() {
    const addjobResponse = await fetch('/api/addjob', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        company,
        title,
        type,
        location,
        salary,
        description,
      }),
    });
    const addjobResponseBody =
      (await addjobResponse.json()) as AddjobResponseBody;

    if ('errors' in addjobResponseBody) {
      setErrors(addjobResponseBody.errors);
      return console.log(addjobResponseBody.errors);
    }
    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }
    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/jobs`);
  }
  return (
    <>
      <Head>
        <title>Add new job</title>
        <meta name="description" content="Register new users" />
      </Head>

      <form
        className={addJobsStyles.addJobsForm}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h1>Add new job</h1>
        {errors.map((error) => {
          return (
            <p
              css={css`
                background-color: red;
                color: white;
                padding: 5px;
              `}
              key={error.message}
            >
              Error: {error.message}
            </p>
          );
        })}
        <label>
          <span>Company</span>
          <input
            value={company}
            onChange={(event) => {
              setCompany(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          <span>Title</span>
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          <span>Type</span>
          <input
            value={type}
            onChange={(event) => {
              setType(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          <span>Location</span>
          <input
            value={location}
            onChange={(event) => {
              setLocation(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          <span>Salary</span>
          <input
            placeholder="Enter numbers only"
            value={salary}
            onChange={(event) => {
              setSalary(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          <span>Description</span>
          <textarea
            placeholder="Expand this field to see more"
            value={description}
            onChange={(event) => {
              setDescription(event.currentTarget.value);
            }}
          />
        </label>

        <br />

        <button
          className="btn-primary"
          onClick={async () => {
            await addjobHandler();
          }}
        >
          Post a job
        </button>
      </form>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/jobs',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
