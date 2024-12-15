import React, { ReactNode } from 'react';
import Image from "next/image";
import styles from "@/app/page.module.css";
import  "@/app/test.sass";


const List = ({children} : { children: ReactNode }) => {
  return (
    <ul className="list">
      {children}
    </ul>
  )
}

export default function Home() {
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
