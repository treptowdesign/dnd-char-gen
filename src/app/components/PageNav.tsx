'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "./PageNav.module.sass";

export default function PageNav() {
  const pathname = usePathname();
  const pageLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/posts', label: 'Posts' },
    { href: '/about', label: 'About' },
  ]; 
  return (
    <>
      <div className={styles.nav}>
          <ul>
            {pageLinks.map(({ href, label }) => (
              <li key={href} className={pathname === href ? styles.active : ""}>
                <Link href={href}>{ label }</Link>  
              </li>
            ))}
          </ul>
      </div>
    </>
  );
}
