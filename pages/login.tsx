import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginResponseBody } from './api/login';

// import { getValidSessionByToken } from '../database/sessions';
// import { RegisterResponseBody } from './api/register';
const formstyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const button = css`
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #64748b;
  }
`;

const input = css`
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
`;

const label = css`
  display: block;
  margin-top: 30px;
  font-size: 23px;
  font-weight: 500;
`;

const placeholder = css`
  color: #e5e5e5;
`;

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
    // await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/jobs`);
  }
  return (
    <>
      <Head>
        <title>Log in</title>
        <meta name="description" content="Log ins" />
      </Head>
      <h1>Log in</h1>
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
      <form css={formstyle}>
        <label>
          username
          <input
            placeholder="Email or Phone"
            value={username}
            onChange={(event: any) => {
              setUsername(event.currentTarget.value.toLowerCase());
            }}
          />
        </label>
        <br />
        <label>
          password
          <input
            value={password}
            placeholder="password"
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </label>
        <button
          onClick={async () => {
            await loginHandler();
          }}
        >
          Log in
        </button>
      </form>
    </>
  );
}
