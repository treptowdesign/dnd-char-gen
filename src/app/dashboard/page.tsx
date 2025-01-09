// import styles from "@/app/page.module.css";
import PageNav from '@/app/components/PageNav';

import styles from "@/app/dashboard/dashboard.module.sass";

export default function Dashboard() {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.container}>
            <PageNav />
            <h1 className={styles.title}>Dashboard</h1>
            <button className={styles.button}>Click Me</button>
          </div>
        </main>
      </div>
    );
  }
  