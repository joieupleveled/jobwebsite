import Head from 'next/head';
import React from 'react';
import css from '../components/layout.module.css';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Jobs </title>
      </Head>
      <div className={css.main}>
        <Header />
        <main>{props.children}</main>
        <footer className={css.footer}>Joie @ Decena</footer>
      </div>
    </>
  );
}
