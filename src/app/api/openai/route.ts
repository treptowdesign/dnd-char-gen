import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, 
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: 'Prompt cannot be empty.' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, 
        { role: 'user', content: prompt },
      ],
    });

    return NextResponse.json({
      response: completion.choices[0]?.message?.content || 'No response returned.',
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
