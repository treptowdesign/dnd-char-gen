import React from "react";
import { CharacterSheet } from "@/app/schema/characterSheet"; // character sheet schema

interface StatsProps {
    character: CharacterSheet;
}

const Stats: React.FC<StatsProps> = ({ character }) => {
  
    return (
      <div className="stats">
        <h2>{character.name}'s Stats</h2>
        <div>
            <strong>Description:</strong> {character.backstory}
        </div>
      </div>
    );
  };
  
  export default Stats;


