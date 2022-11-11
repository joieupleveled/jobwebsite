import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  background-color: #972d07;
  border: 20px;
  margin: 100px 100px;
  padding: 10px;

  > a {
    margin-left: 13px;
    color: white;
    padding: 65px;
    font-size: large;
    font-weight: 600;
  }
`;

const icon = css`
  height: 40px;
`;

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          <Link href="/">Home</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/about">About</Link>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 15 }}>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
