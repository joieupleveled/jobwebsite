import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import { Layout } from '../components/Layout';
import { getServerSideProps } from './jobs';

const navStyles = css`
  background-color: #ddd;
  border-radius: 6px;
  margin: 20px 10px;
  padding: 15px;
  display: flex;
  > a + a {
    margin-left: 13px;
  }
  > div {
    margin-right: auto;
    display: flex;
    gap: 6px;
  }
`;

export default function Home() {
  return (
    <header>
      <div>
        <div>
          <Image
            src={'/zebra.png'}
            alt="white and black zebra"
            width={500}
            height={500}
          />
        </div>
      </div>
    </header>
  );
}
