'use client';

import { useAuth } from './AuthProvider';

import LoginForm from '@/app/components/LoginForm';
import RegisterForm from '@/app/components/RegisterForm'; 
import LogoutButton from '@/app/components/LogoutButton';
import { useState } from 'react';

export default function NavBar() {
  const { user } = useAuth(); 
  const [displayLogin, setDisplayLogin] = useState(true);

  const toggleLogin = () => {
    setDisplayLogin(!displayLogin); 
  }

  return (
    <nav>
      <div>
        {user ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <>
          {displayLogin ? <LoginForm /> : <RegisterForm />}
            <button onClick={toggleLogin}>
                {displayLogin ? 'Create a new user' : 'Login existing user'}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
