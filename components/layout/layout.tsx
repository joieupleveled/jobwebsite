import Head from 'next/head';
import css from './layout.module.css';

export interface LayoutProps {
  title: string;
  children: any;
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => (
  <>
    <Head>
      <title>Indeed Jobs | {title}</title>
    </Head>
    <div className={css.container}>
      <header className={css.header}>
        <h1>
          <span className={css['header-brand']}>Indeed</span> Jobs
        </h1>
      </header>
      <main className={css.main}>{children}</main>
      <footer className={css.footer}>Joie @ Decena</footer>
    </div>
  </>
);
