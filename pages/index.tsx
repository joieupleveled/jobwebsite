// import Image from 'next/image';
// import Link from 'next/link';
import '../styles/globals.css';
import Image from 'next/image';

// const prgph = css`
//   background: #0cf;
//   margin-top: -1.6rem;
//   z-index: 100;
// `;

// const positioned = css`
//   position: relative;
// `;

export default function Home() {
  return (
    <>
      <head>
        <title>Landing page</title>
      </head>
      <body>
        <Image src="/photographer.jpg" className="bg-image" />

        <div className="bg-text">
          <h1>I am John Doe</h1>
          <p>And I'm a Photographer</p>
        </div>
      </body>
    </>
  );
}
