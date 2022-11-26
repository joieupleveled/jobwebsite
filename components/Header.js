// import { css } from '@emotion/react';
import Link from 'next/link';
import css from '../components/layout.module.css';

export default function Header() {
  return (
    <header>
      <nav className={css.navStyles}>
        <Link href="/">Home</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/register">Register</Link>
        <Link href="/addjobs">Add Job</Link>
        <Link href="/login">Login</Link>
        <Link href="/logout">Logout</Link>
      </nav>
    </header>
  );
}
