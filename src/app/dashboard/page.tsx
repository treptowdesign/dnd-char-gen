import styles from "@/app/page.module.css";
import PageNav from '@/app/components/PageNav';

export default function Dashboard() {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
            <PageNav />
            <h1>Dashboard</h1>
            <p>This is the dashboard page.</p>
        </main>
      </div>
    );
  }
  