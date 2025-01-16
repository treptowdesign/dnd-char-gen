import React, { ReactNode } from 'react';
import styles from "@/app/page.module.css";
import  "@/app/test.sass";

const List = ({children} : { children: ReactNode }) => {
  return (
    <ul className="list">
      {children}
    </ul>
  )
}

export default function About() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>About Page</h1>
        <List>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </List>
      </main>
    </div>
  );
}
