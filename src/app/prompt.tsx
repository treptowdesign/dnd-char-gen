'use client'; 

import React, { useState } from 'react';
import  "@/app/prompt.sass";
import  Stats from "@/app/stats";
import { CharacterSheet } from "@/app/schema/characterSheet"; // character sheet schema

export default function Prompt() {
  const [response, setResponse] = useState<CharacterSheet | null>(null);
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
        setResponse(data.response as CharacterSheet);
        console.log('Tokens used:', data.total_tokens);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error fetching from API route:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt">

        <input
            type="text"
            placeholder="Enter a prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
        />

        <button onClick={fetchResponse} disabled={loading}>
          {loading ? 'Loading...' : 'Generate Response'}
        </button>

        {response && (
          <Stats character={response} />
        )}
    </div>
  );
}
