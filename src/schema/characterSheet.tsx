import { z } from "zod";

// zod object
export const characterSheet = z.object({
    name: z.string().describe("The name of the character"),
    class: z.enum([
        "Barbarian",
        "Bard",
        "Cleric",
        "Druid",
        "Fighter",
        "Monk",
        "Paladin",
        "Ranger",
        "Rogue",
        "Sorcerer",
        "Warlock",
        "Wizard",
        "Artificer", 
    ]).describe("The class of the character, only valid 5e D&D classes are allowed"),
    race: z.string().describe("The race of the character, e.g., Elf, Human"),
    alignment: z.enum([
        "Lawful Good", "Neutral Good", "Chaotic Good",
        "Lawful Neutral", "True Neutral", "Chaotic Neutral",
        "Lawful Evil", "Neutral Evil", "Chaotic Evil"
    ]).describe("The alignment of the character"),
    background: z.string().describe("The background of the character, e.g., Soldier, Noble"),
    abilities: z.object({
      strength: z.number().int().describe("Strength ability score appropriate for the character's class"),
      dexterity: z.number().int().describe("Dexterity ability score appropriate for the character's class"),
      constitution: z.number().int().describe("Constitution ability score appropriate for the character's class"),
      intelligence: z.number().int().describe("Intelligence ability score appropriate for the character's class"),
      wisdom: z.number().int().describe("Wisdom ability score appropriate for the character's class"),
      charisma: z.number().int().describe("Charisma ability score appropriate for the character's class"),
    }).describe("The ability scores of the character"),
    skills: z.array(z.string()).describe("A list of skills the character is proficient in"),
    equipment: z.array(z.string()).describe("A list of equipment the character carries"),
    spells: z.array(z.string()).optional().describe("A list of spells the character knows, if applicable"),
    hitPoints: z.number().int().describe("The total hit points of the character"),
    armorClass: z.number().int().describe("The armor class of the character"),
    speed: z.number().int().describe("The speed of the character in feet per round"),
    description: z.string().describe("Text blurb about the character and his/her background and history")
});

// inferred TypeScript type
export type CharacterSheet = z.infer<typeof characterSheet>;