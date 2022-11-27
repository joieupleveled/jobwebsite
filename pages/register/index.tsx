import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../../database/sessions';
import { RegisterResponseBody } from '../api/register';
import registerStyles from './registerStyles.module.css';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Register(props: Props) {
  // const [firstname, setFirstname] = useState('');
  // const [lastname, setLastname] = useState('');
  // const [emailaddress, setEmailaddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return console.log(registerResponseBody.errors);
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
        <title>Register new user</title>
        <meta name="description" content="Register new users" />
      </Head>
      <div className={registerStyles.container}>
        <form className={registerStyles.registerForm}>
          <h1>Register new user</h1>
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
            <span>username</span>
            <input
              value={username}
              onChange={(event: any) => {
                setUsername(event.currentTarget.value.toLowerCase());
              }}
            />
          </label>
          <br />
          <label>
            <span>password</span>
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>

          <button
            className="btn-primary"
            onClick={async () => {
              await registerHandler();
            }}
          >
            Register
          </button>
        </form>
      </div>
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
