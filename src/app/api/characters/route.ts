import { NextRequest, NextResponse } from "next/server";
import prisma from '@/models/prismaClient';
import { getUserFromServer } from "@/app/lib/auth"; // server side auth
import { characterSheet } from "@/schema/characterSheet"; 

// CREATE a new character
export async function POST(req: NextRequest) {
  // console.log('CREATE');
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const validationResult = characterSheet.safeParse(body); // validate input

    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.format() }, { status: 400 });
    }

    const character = await prisma.character.create({
      data: { ...validationResult.data, userId: user.id },
    });

    return NextResponse.json(character, { status: 201 });
  } catch (error) {
    console.error("Error creating character:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// READ all characters for the logged-in user
export async function GET(req: NextRequest) {
  // console.log('READ');
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
  // console.log('UPDATE');
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const validationResult = characterSheet.partial().safeParse(body); // allow partial updates

    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.format() }, { status: 400 });
    }

    const character = await prisma.character.update({
      where: { id: body.id, userId: user.id },
      data: validationResult.data,
    });

    return NextResponse.json(character, { status: 200 });
  } catch (error) {
    console.error("Error updating character:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// DELETE a character
export async function DELETE(req: NextRequest) {
  // console.log('DELETE');
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
