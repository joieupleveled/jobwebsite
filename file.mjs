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
      <form css={formstyle}>
        <h2>Login Here</h2>
        {errors.map((error) => {
          return <p key={error.message}>Error: {error.message}</p>;
        })}
        <div css={label}>
          <label>
            Username:
            <input
              value={username}
              placeholder="Email or Phone"
              onChange={(event: any) => {
                setUsername(event.currentTarget.value.toLowerCase());
              }}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              value={password}
              placeholder="password"
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>
        </div>
        <button
          css={button}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const token = context.req.cookies.sessionToken;

  // if (token && (await getValidSessionByToken(token))) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: true,
  //     },
  //   };
  // }

  return {
    props: {},
  };
}
