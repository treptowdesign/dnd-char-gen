import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { zodResponseFormat } from "openai/helpers/zod";
// import { z } from "zod";
import { characterSheet } from "@/app/schema/characterSheet"; // character sheet schema

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, 
});

// const JokeStructure = z.object({
//     setup: z.string(),
//     punchline: z.string(),
// });

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: 'Prompt cannot be empty.' }, { status: 400 });
    }

    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [
    //     { role: 'system', content: 'You are a helpful assistant.' }, 
    //     { role: 'user', content: prompt },
    //   ],
    // });

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful DM, please return a 5e d&d character sheet based on the prompt." },
          { role: "user", content: prompt},
        ],
        response_format: zodResponseFormat(characterSheet, "character_sheet"),
    });

    return NextResponse.json({
      response: JSON.parse(completion.choices[0]?.message?.content || '{}'),
      total_tokens: completion.usage?.total_tokens || 0,
    });

  } catch (error) {
    console.error('Error in OpenAI API call:', error);
    return NextResponse.json(
      { error: 'Failed to fetch response from OpenAI.' },
      { status: 500 }
    );
  }
}
