"use client";

import React, { useEffect, useState } from "react";

interface StatsProps {
  character: {
    id?: number;
    name: string;
    class: string;
    race: string;
    description: string;
  } | null;
  onCharacterSaved: (character: { id?: number; name: string; class: string; race: string; description: string }) => void;
}

const Stats: React.FC<StatsProps> = ({ character, onCharacterSaved }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState(character);

  useEffect(() => {
    // reset state when a new character is selected
    setEditedCharacter(character);
    setSaved(false); // reset save state when switching characters
  }, [character]);

  if (!character) {
    return <p>No character selected. Generate one or choose from your saved list.</p>;
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedCharacter(character); // reset changes when toggling
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedCharacter((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : prev
    );
  };

  const saveCharacter = async () => {
    if (!editedCharacter) return;

    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/characters", {
        method: editedCharacter.id ? "PUT" : "POST", // use PUT for updates, POST for new characters
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedCharacter),
      });

      if (res.ok) {
        const data = await res.json();
        setSaved(true);
        setIsEditing(false);

        // if it was a new character, update the ID and notify page.tsx
        setEditedCharacter((prev) => prev ? { ...prev, id: data.id } : prev);
        onCharacterSaved(data); // update parent
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
      <h2>{editedCharacter?.name}'s Stats</h2>
      {isEditing ? (
        <>
          <label>
            <strong>Name:</strong>
            <input type="text" name="name" value={editedCharacter?.name} onChange={handleChange} />
          </label>
          <label>
            <strong>Class:</strong>
            <input type="text" name="class" value={editedCharacter?.class} onChange={handleChange} />
          </label>
          <label>
            <strong>Race:</strong>
            <input type="text" name="race" value={editedCharacter?.race} onChange={handleChange} />
          </label>
          <label>
            <strong>Description:</strong>
            <textarea name="description" value={editedCharacter?.description} onChange={handleChange} />
          </label>

          <button onClick={saveCharacter} disabled={saving}>
            {saving ? "Saving..." : "Save Character"}
          </button>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Class:</strong> {editedCharacter?.class}</p>
          <p><strong>Race:</strong> {editedCharacter?.race}</p>
          <p><strong>Description:</strong> {editedCharacter?.description}</p>

          <button onClick={toggleEdit}>Edit Character</button>
          <button onClick={saveCharacter} disabled={saving || saved}>
            {saving ? "Saving..." : saved ? "Saved!" : "Save Character"}
          </button>
        </>
      )}
    </div>
  );
};

export default Stats;
