import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../../database/sessions';
import { LoginResponseBody } from '../api/login';
import loginStyles from './loginStyles.module.css';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Login(props: Props) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function loginHandler() {
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return console.log(loginResponseBody.errors);
    }

    console.log(router.query.returnTo);

    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      // refresh the user on state
      await props.refreshUserProfile();
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/profile-account`);
  }

  return (
    <>
      <Head>
        <title>Log in</title>
        <meta name="description" content="Log ins" />
      </Head>
      <div className={loginStyles.container}>
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
        <form className={loginStyles.loginForm}>
          <h1>Log in</h1>
          <label>
            <span>Username</span>
            <input
              placeholder="Username/Email"
              value={username}
              onChange={(event: any) => {
                setUsername(event.currentTarget.value.toLowerCase());
              }}
            />
          </label>
          <br />
          <label>
            <span>Password</span>
            <input
              value={password}
              placeholder="password"
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>
          <button
            className="btn-primary"
            onClick={async () => {
              await loginHandler();
            }}
          >
            Log in
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
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
