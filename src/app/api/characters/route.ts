import { NextRequest, NextResponse } from "next/server";
import prisma from '@/models/prismaClient';
import { getUserFromServer } from "@/app/lib/auth"; // server side auth

// CREATE a new character
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, class: characterClass, race, description } = await req.json();
    if (!name || !characterClass || !race || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const character = await prisma.character.create({
      data: { name, class: characterClass, race, description, userId: user.id },
    });

    return NextResponse.json(character, { status: 201 });
  } catch (error) {
    console.error("Error creating character:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// READ all characters for the logged-in user
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const characters = await prisma.character.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(characters, { status: 200 });
  } catch (error) {
    console.error("Error fetching characters:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// UPDATE a character
export async function PUT(req: NextRequest) {
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, name, class: characterClass, race, description } = await req.json();
    if (!id || !name || !characterClass || !race || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const character = await prisma.character.update({
      where: { id, userId: user.id },
      data: { name, class: characterClass, race, description },
    });

    return NextResponse.json(character, { status: 200 });
  } catch (error) {
    console.error("Error updating character:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// DELETE a character
export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await prisma.character.delete({
      where: { id, userId: user.id },
    });

    return NextResponse.json({ message: "Character deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting character:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
