import React, { useState } from "react";
import { CharacterSheet } from "@/schema/characterSheet"; // character sheet schema

interface StatsProps {
  character: CharacterSheet;
}

const Stats: React.FC<StatsProps> = ({ character }) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveCharacter = async () => {
    setSaving(true);

    try {
      const res = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: character.name,
          class: character.class,
          race: character.race,
          description: character.backstory,
        }),
      });

      if (res.ok) {
        setSaved(true);
      } else {
        console.error("Error saving character:", await res.json());
      }
    } catch (error) {
      console.error("Error saving character:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="stats">
      <h2>{character.name}'s Stats</h2>
      <p><strong>Class:</strong> {character.class}</p>
      <p><strong>Race:</strong> {character.race}</p>
      <p><strong>Description:</strong> {character.backstory}</p>

      <button onClick={saveCharacter} disabled={saving || saved}>
        {saving ? "Saving..." : saved ? "Saved!" : "Save Character"}
      </button>
    </div>
  );
};

export default Stats;
