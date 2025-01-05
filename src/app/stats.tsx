import React from "react";
import { CharacterSheet } from "@/schema/characterSheet"; // character sheet schema

interface StatsProps {
    character: CharacterSheet;
}

const Stats: React.FC<StatsProps> = ({ character }) => {
  
    return (
      <div className="stats">
        <h2>{character.name}'s Stats</h2>
        <p><strong>Class:</strong> {character.class}</p>
        <p><strong>Race:</strong> {character.race}</p>
        <p><strong>Alignment:</strong> {character.background}</p>
        <p><strong>Class:</strong> {character.class}</p>
        <div>
            <h3>Abilities</h3>
            <ul>
            {Object.entries(character.abilities).map(([ability, score]) => (
                <li key={ability}>
                <strong>{ability.charAt(0).toUpperCase() + ability.slice(1)}:</strong> {score}
                </li>
            ))}
            </ul>
        </div>
        <div>
            <h3>Skills</h3>
            <ul>
            {character.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
            ))}
            </ul>
        </div>
        <div>
            <strong>Description:</strong> {character.backstory}
        </div>
      </div>
    );
  };
  
  export default Stats;


