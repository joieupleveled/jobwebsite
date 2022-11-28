import { css } from '@emotion/react';

const homepageStyle = css`
  background-image: url('/photographer.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  filter: blur(8px);
  -webkit-filter: blur(8px);
`;

/* Position text in the middle of the page/image */
const bgtext = css`
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba 0, 0, 0, 0.4;

  /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
`;

export default function Home() {
  return (
    <>
      <head>
        <title>Landing page</title>
      </head>

      <div css={homepageStyle}>
        <div>
          <h1 css={bgtext}>Discover new opportunites or post a new one!</h1>
          <p>And I'm a Photographer</p>
        </div>
      </div>
    </>
  );
}
