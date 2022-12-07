import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import ThemeToggle from '../ThemeToggle';

import styles from './navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.Navbar}>
      <Link href="/" className={styles.NavbarLogoLink}>
        <h1>
          Expense Tracker
          {/* <Image width={70} height={40} src="/gokul.png" alt="gokul.site" /> */}
        </h1>
      </Link>

      <div className={styles.NavbarLinks}>
        <Link
          href="/"
          className={router.pathname === '/' ? styles.NavbarLinkActive : ''}
        >
          <span>Overview</span>
        </Link>
        <Link
          href="/expenses"
          className={
            router.pathname === '/expenses' ? styles.NavbarLinkActive : ''
          }
        >
          <span>Expense</span>
        </Link>
        <Link
          href="/income"
          className={
            router.pathname === '/income' ? styles.NavbarLinkActive : ''
          }
        >
          <span>Income</span>
        </Link>
        <Link
          href="/savings"
          className={
            router.pathname === '/savings' ? styles.NavbarLinkActive : ''
          }
        >
          <span>Savings</span>
        </Link>
        <Link
          href="/subscriptions"
          className={
            router.pathname === '/subscriptions' ? styles.NavbarLinkActive : ''
          }
        >
          <span>Subscriptions</span>
        </Link>
      </div>

      <div className={styles.ThemeToggle}>
        <ThemeToggle />
      </div>
    </nav>
  );
}
