// import { css } from '@emotion/react';
import Link from 'next/link';
import { FaBriefcase, FaHome, FaPlusSquare } from 'react-icons/fa';
import navStyles from './navStyles.module.css';

export default function Header(props) {
  return (
    <header>
      <nav className={navStyles.nav}>
        <Link href="/">
          <div className={navStyles.navLink}>
            <FaHome size={30} />
            <span>Home</span>
          </div>
        </Link>
        <Link href="/jobs">
          <div className={navStyles.navLink}>
            <FaBriefcase size={25} />
            <span>Jobs</span>
          </div>
        </Link>

        {props.user ? (
          <>
            <Link href="/logout">
              <button className={navStyles.logoutButton}>Logout</button>
            </Link>
            <Link href="/profile-account">
              <button className={navStyles.profileaccount}>Account</button>
            </Link>
            <Link href="/addjobs">
              <div className={navStyles.navLink}>
                <FaPlusSquare size={25} />
                <span>Post a Job</span>
              </div>
            </Link>
          </>
        ) : (
          <div className={navStyles.buttonContainer}>
            <Link href="/register">
              <button className={navStyles.registerButton}>Register</button>
            </Link>

            <Link href="/login">
              <button className={navStyles.loginButton}>Login</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
