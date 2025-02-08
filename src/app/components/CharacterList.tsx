"use client";

import React from "react";

interface Character {
  id?: number;
  name: string;
  class: string;
  race: string;
  alignment: string;
  description: string;
}

interface CharacterListProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
  onDeleteCharacter: (id: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onSelectCharacter, onDeleteCharacter }) => {
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this character?")) return;

    try {
      const res = await fetch("/api/characters", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        onDeleteCharacter(id);
      } else {
        console.error("Error deleting character:", await res.json());
      }
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  return (
    <div className="character-list">
      <h2>Your Saved Characters</h2>
      {characters.length > 0 ? (
        <ul>
          {characters.map((char) => (
            <li key={char.id}>
              <button className="inline" onClick={() => onSelectCharacter(char)}>
                {char.name} ({char.class} - {char.race})
              </button>
              <button className="inline" onClick={() => handleDelete(char.id!)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved characters yet.</p>
      )}
    </div>
  );
};

export default CharacterList;
