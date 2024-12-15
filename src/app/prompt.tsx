'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Prompt({apiKey} : {apiKey: string}) {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const fetchResponse = async () => {
    if (!prompt.trim()) {
      console.log('Prompt is empty. Please provide valid input.');
      return;
    }

    try {
      setLoading(true);
      setResponse(null);

      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.response);
        console.log('Tokens used:', data.total_tokens);
      } else {
        console.error('Error:', data.error);
        setResponse('Failed to fetch response.');
      }
    } catch (error) {
      console.error('Error fetching from API route:', error);
      setResponse('Error occurred while fetching response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <input
            type="text"
            placeholder="Enter a prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
        />

        <button onClick={fetchResponse} disabled={loading} className={styles.button}>
          {loading ? 'Loading...' : 'Generate Response'}
        </button>

        {response && (
          <div className="response-text">
            <h2>AI Response:</h2>
            <p>{response}</p>
          </div>
        )}

        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
