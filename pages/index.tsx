import { getWoods, Wood } from '../../database/woods';

// import { woods } from '../../database/woods';

const woodStyles = css`
  /* border-radius: 20%; */
  border: 1px solid #ccc;
  padding: 20px;
  flex-direction: row;
  /* display: inline-block;
  width: 50%; */
  h2 {
    margin-top: 0;
  }
  & + & {
    margin-top: 25px;
  }
`;

type Props = {
  woods: Wood[];
};

export default function Woods(props: Props) {
  // console.log('props in the browser', props);
  return (
    <>
      <Head>
        <title>Our Wood Products</title>
        <meta name="Description" content="List page of all woods" />
      </Head>

      <h1>Our Wood Products</h1>

      <div>
        {props.woods.map((wood) => {
          return (
            <div
              data-test-id={`wood-type-${wood.type}`}
              key={`wood-${wood.id}`}
              css={woodStyles}
            >
              <h2>
                <Link href={`/woods/${wood.id}`}>{wood.name}</Link>
              </h2>

              <Link href={`/woods/${wood.id}`}>
                <a>
                  <Image
                    src={`/${wood.id}-${wood.name.toLowerCase()}.jpeg`}
                    alt=""
                    width="150"
                    height="200"
                  />
                </a>
              </Link>

              <div>Type: {wood.type}</div>
              {/* <div>Description: {wood.Description}</div> */}
              <div>Price: €{wood.price}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
// Anything inside of this function will
// ONLY be run on the server (in Node.js)
//
// This means you can access thins like `fs``

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  // Get the woods direct from the database
  const woods = await getWoods();

  // console.log('woods', woods);

  // console.log(tryConnect());
  return {
    // Retrieve me the information from the server side((Node)and pass it to the componenent)
    // By adding the "props" parameter on "Woods(props)" line 20 (1:07) to connect the BE to FE
    // Anything that you write in this props object will become the props that are passed to the page component anove
    // Then display me the woods in the browser! Whatever was declared below will be pass on to the function in line 20

    // Do not use with other files because getServerSideProps only works from files within pages
    props: {
      // 1st prop, containg all woods
      woods: woods,
    },
  };
}
