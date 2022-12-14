import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user?: User;
};

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Account Information</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <h1>Account Information</h1>
      <hr />
      <h3>Username: {props.user.username}</h3>
      <br />

      <Link href="/addjobs">
        <button>Change password</button>
      </Link>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile-account',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}
