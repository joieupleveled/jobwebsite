import { css } from '@emotion/react';

const gf = css`
  margin: 3%;
  position: relative;
`;

export default function Home() {
  return (
    <header>
      <div css={gf}>
        <div>
          <p>Home page works!</p>
        </div>
      </div>
    </header>
  );
}
