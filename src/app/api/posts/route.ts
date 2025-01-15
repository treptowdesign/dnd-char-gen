import { NextRequest, NextResponse } from "next/server";
import prisma from '@/models/prismaClient';
import { getUserFromServer } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: { title, content, authorId: user.id },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const posts = await prisma.post.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, title, content } = await req.json();
    if (!id || !title || !content) {
      return NextResponse.json({ error: "ID, title, and content are required" }, { status: 400 });
    }

    const post = await prisma.post.update({
      where: { id, authorId: user.id },
      data: { title, content },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromServer();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await prisma.post.delete({
      where: { id, authorId: user.id },
    });

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
