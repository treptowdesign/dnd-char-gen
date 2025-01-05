'use client';

import { useAuth } from './AuthProvider';

import LoginForm from '@/app/components/LoginForm';
import RegisterForm from '@/app/components/RegisterForm';
import LogoutButton from '@/app/components/LogoutButton';

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <h1>D&D Character Generator</h1>
      <div>
        {user ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginForm />
            <RegisterForm />
          </>
        )}
      </div>
    </nav>
  );
}
