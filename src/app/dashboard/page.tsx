'use client';

import { useState } from 'react';
import styles from "@/app/dashboard/page.module.sass";

export default function Dashboard() {
    const [count, setCount] = useState(0);

    const handleClick = (val: number) => {
      setCount(count + val);
    };

    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.container}>
            <h1 className={styles.title}>Dashboard</h1>
            <div>{ count }</div>
            <button className={styles.button} onClick={() => handleClick(1)}>Inc</button>
            <button className={styles.button} onClick={() => handleClick(-1)}>Dec</button>
          </div>
        </main>
      </div>
    );
  }
  