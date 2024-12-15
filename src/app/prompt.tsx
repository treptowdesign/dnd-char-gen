'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
// import '@/app/test.sass';
import OpenAI from 'openai';

export default function Prompt({apiKey} : {apiKey: string}) {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  // const openai = new OpenAI();
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  const fetchHaiku = async () => {
    if (!prompt.trim()) {
        console.log('Prompt is empty. Please provide a valid input.');
        return;
    }
    try {
      setLoading(true);
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      });
      setResponse(completion.choices[0].message?.content || 'No response returned.');
      // log token usage... 
      if (completion.usage?.total_tokens !== undefined) {
        console.log('Tokens:', completion.usage.total_tokens);
      } else {
        console.log('Total tokens not available.');
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Failed to fetch response.');
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

        <button onClick={fetchHaiku} disabled={loading} className={styles.button}>
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
