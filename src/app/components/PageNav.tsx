import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/posts">Posts</Link></li>
        </ul>
    </div>
  );
}
