"use client";

import React, { useState } from "react";
import "@/app/prompt.sass";
import { CharacterSheet } from "@/schema/characterSheet";

interface PromptProps {
  onCharacterGenerated: (character: {
    name: string;
    class: string;
    race: string;
    description: string;
  }) => void;
}

export default function Prompt({ onCharacterGenerated }: PromptProps) {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const fetchResponse = async () => {
    if (!prompt.trim()) {
      console.log("Prompt is empty. Please provide valid input.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        // Extract only the required fields
        const character = {
          name: data.response.name,
          class: data.response.class,
          race: data.response.race,
          description: data.response.description, // Mapping backstory -> description
        };
        onCharacterGenerated(character);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching from API route:", error);
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
        {loading ? "Loading..." : "Generate Response"}
      </button>
    </div>
  );
}
