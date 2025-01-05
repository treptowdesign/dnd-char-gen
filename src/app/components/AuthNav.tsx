'use client';

import { useAuth } from './AuthProvider';

import LoginForm from '@/app/components/LoginForm';
import RegisterForm from '@/app/components/RegisterForm'; 
import LogoutButton from '@/app/components/LogoutButton';

export default function NavBar() {
  const { user } = useAuth(); 

  return (
    <nav>
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
