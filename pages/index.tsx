import { css } from '@emotion/react';
import Layout from '../components/Layout';

const firsttext = css`
  position: absolute;
  top: 17px;
  left: 20px;
  color: #3c3c3a;
  font-size: 50px;
`;

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
