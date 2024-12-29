'use client';

import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password) {
      setMessage('Both username and password are required');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! You can now log in.');
        setUsername('');
        setPassword('');
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
