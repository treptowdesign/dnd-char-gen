'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="counter">
        <button onClick={() => setCount(count + 1)}>Inc</button>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count - 1)}>Dec</button>
    </div>
  );
}