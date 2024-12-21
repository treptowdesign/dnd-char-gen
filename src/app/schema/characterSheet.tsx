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
    alignment: z.string().describe("The alignment of the character, e.g., Chaotic Good"),
    background: z.string().describe("The background of the character, e.g., Soldier, Noble"),
    abilities: z.object({
      strength: z.number().int().describe("Strength ability score"),
      dexterity: z.number().int().describe("Dexterity ability score"),
      constitution: z.number().int().describe("Constitution ability score"),
      intelligence: z.number().int().describe("Intelligence ability score"),
      wisdom: z.number().int().describe("Wisdom ability score"),
      charisma: z.number().int().describe("Charisma ability score"),
    }).describe("The ability scores of the character"),
    skills: z.array(z.string()).describe("A list of skills the character is proficient in"),
    equipment: z.array(z.string()).describe("A list of equipment the character carries"),
    spells: z.array(z.string()).optional().describe("A list of spells the character knows, if applicable"),
    hitPoints: z.number().int().describe("The total hit points of the character"),
    armorClass: z.number().int().describe("The armor class of the character"),
    speed: z.number().int().describe("The speed of the character in feet per round"),
    backstory: z.string().describe("Text blurb about the character and his/her background and history")
});

// inferred TypeScript type
export type CharacterSheet = z.infer<typeof characterSheet>;