import React, { ReactNode} from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import  "@/app/test.sass";
import  Prompt from "@/app/prompt";

import  UserLogin from "@/app/components/UserLogin";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <UserLogin />
        <h1>D&D Character Generator</h1>
        <p>Enter a character idea</p>
        <Prompt />
      </main>
      <footer className={styles.footer}>
      <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </footer>
    </div>
  );
}
