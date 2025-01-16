"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/components/AuthProvider"; // client side auth

import PageNav from '@/app/components/PageNav';

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostsPage() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreatePost = async () => {
    if (!title || !content) return alert("Title and content are required.");
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const newPost = await res.json();
      if (res.ok) setPosts([newPost, ...posts]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }

    setLoading(false);
  };

  const handleUpdatePost = async () => {
    if (!editingPost || !title || !content) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/posts`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingPost.id, title, content }),
      });

      const updatedPost = await res.json();
      if (res.ok) {
        setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
        setEditingPost(null);
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }

    setLoading(false);
  };

  const handleDeletePost = async (id: number) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/posts`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) setPosts(posts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }

    setLoading(false);
  };

  return (
    <div className="posts-container">
        <PageNav />
      <h1>My Posts</h1>

      {user ? (
        <>
          <div className="post-form">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {editingPost ? (
              <button onClick={handleUpdatePost} disabled={loading}>
                {loading ? "Updating..." : "Update Post"}
              </button>
            ) : (
              <button onClick={handleCreatePost} disabled={loading}>
                {loading ? "Creating..." : "Create Post"}
              </button>
            )}
            {editingPost && (
              <button onClick={() => setEditingPost(null)}>Cancel Edit</button>
            )}
          </div>

          <ul className="posts-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id} className="post-item">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                  <div className="post-actions">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setTitle(post.title);
                        setContent(post.content);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </div>
                </li>
              ))
            ) : (
              <p>No posts found. Create one above!</p>
            )}
          </ul>
        </>
      ) : (
        <p>Please log in to manage posts.</p>
      )}
    </div>
  );
}
