import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  background-color: #ddd;
  border-radius: 6px;
  margin: 20px 10px;
  padding: 15px;
  display: flex;
  gap: 70px;

  > a {
    margin-left: 13px;
  }
  > div {
    margin-right: auto;
    display: flex;
    gap: 70px;
  }
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          <Link href="/">Home</Link>
          <Link href="/jobs">Jobs</Link>
        </div>
        <Link href="/register">Register</Link>
        <Link href="/addjobs">Add Job</Link>
        <Link href="/login">Login</Link>
        <Link href="/logout">Logout</Link>
      </nav>
    </header>
  );
}
