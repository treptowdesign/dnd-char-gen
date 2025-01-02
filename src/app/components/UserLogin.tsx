'use client';

import { useState } from 'react';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Registration successful: ${JSON.stringify(data)}`);
      } else {
        setMessage(`Registration failed: ${data.error}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Registration failed: ${error.message}`);
      } else {
        setMessage(`Registration failed: Unknown error`);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Login successful: ${JSON.stringify(data)}`);
      } else {
        setMessage(`Login failed: ${data.error}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Login failed: ${error.message}`);
      } else {
        setMessage(`Login failed: Unknown error`);
      }
    }
  };

  return (
    <div>
      <h2>User Login & Registration</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        {/* <button onClick={handleRegister}>Register</button> */}
        <button onClick={handleLogin}>Login</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserLogin;
