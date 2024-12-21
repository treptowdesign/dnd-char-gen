import React, { ReactNode} from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import  "@/app/test.sass";
import  Prompt from "@/app/prompt";

const apiKey = process.env.SECRET_API_KEY!

// const List = ({children} : { children: ReactNode }) => {
//   return (
//     <ul className="list">
//       {children}
//     </ul>
//   )
// }

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Prompt apiKey={apiKey} />

        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
      </main>
      <footer className={styles.footer}>
        {/* Footer */}
      </footer>
    </div>
  );
}
