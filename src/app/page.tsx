"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "./components/AuthProvider";

import Image from "next/image";
import styles from "./page.module.css";
import "@/app/test.sass";

import AuthNav from "@/app/components/AuthNav";
import Prompt from "@/app/prompt";
import CharacterList from "@/app/components/CharacterList";
import Stats from "@/app/stats";

interface Character {
  id?: number;
  name: string;
  class: string;
  race: string;
  description: string;
}

export default function Home() {
  const { user, authLoading } = useAuth();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);

  // Fetch characters once on mount
  useEffect(() => {
    if (!user) {
      // Clear active character and characters when logging out
      setCharacters([]);
      setActiveCharacter(null);
      return;
    }

    const fetchCharacters = async () => {
      try {
        const res = await fetch("/api/characters");
        if (res.ok) {
          const data = await res.json();
          setCharacters(data);
        } else {
          console.error("Error fetching characters:", await res.json());
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, [user]); // Refetch when user logs in

  const handleCharacterGenerated = (character: Character) => {
    setActiveCharacter(character);
  };

  const handleCharacterSaved = (newCharacter: Character) => {
    setCharacters((prev) =>
      prev.some((char) => char.id === newCharacter.id)
        ? prev.map((char) => (char.id === newCharacter.id ? newCharacter : char)) // Update existing
        : [...prev, newCharacter] // Add new
    );
    // Update the active character to include its new ID for stats
    setActiveCharacter(newCharacter);
  };

  const handleCharacterDeleted = (deletedId: number) => {
    setCharacters((prev) => prev.filter((char) => char.id !== deletedId));

    if (activeCharacter?.id === deletedId) {
      setActiveCharacter(null); // Clear if the deleted character was selected
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AuthNav />
        <h1>D&D Character Generator Home</h1>
        <p>Enter a character idea or choose a saved one.</p>
        {user && (
          <>
            <Prompt onCharacterGenerated={handleCharacterGenerated} />
            <CharacterList characters={characters} onSelectCharacter={setActiveCharacter} onDeleteCharacter={handleCharacterDeleted} />
            <Stats character={activeCharacter} onCharacterSaved={handleCharacterSaved} />
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </footer>
    </div>
  );
}
