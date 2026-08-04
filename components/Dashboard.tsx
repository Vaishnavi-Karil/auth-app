'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, PostVisibility } from '@/lib/types';
import PostForm from './PostForm';
import PostCard from './PostCard';
import ShareModal from './ShareModal';

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [filterVisibility, setFilterVisibility] = useState<PostVisibility | 'all'>('all');

  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharedPost, setSharedPost] = useState<Post | null>(null);
  const [sharingLoading, setSharingLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts');
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      } else {
        setError('Failed to load posts');
      }
    } catch (err) {
      setError('Error loading posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (formData: {
    title: string;
    content: string;
  }) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          visibility: 'private', // Default to private
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      const newPost = data.data;
      setPosts([newPost, ...posts]);

      // Open share modal with the new post
      setSharedPost(newPost);
      setShowShareModal(true);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeVisibility = async (visibility: PostVisibility) => {
    if (!sharedPost) return;

    try {
      setSharingLoading(true);
      const response = await fetch(`/api/posts/${sharedPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: sharedPost.title,
          content: sharedPost.content,
          visibility,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      // Update posts list with new visibility
      const updatedPost = data.data;
      setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
      setSharedPost(updatedPost);
    } catch (err: any) {
      setError(err.message || 'Failed to change visibility');
    } finally {
      setSharingLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setPosts(posts.filter((p) => p.id !== postId));
      } else {
        setError('Failed to delete post');
      }
    } catch (err) {
      setError('Error deleting post');
      console.error(err);
    }
  };

  const filteredPosts =
    filterVisibility === 'all'
      ? posts
      : posts.filter((p) => p.visibility === filterVisibility);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">📝 My Blog</h1>
              <p className="text-gray-600">
                Create and manage your personal posts and notes
              </p>
            </div>
            <Link
              href="/blog"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              📚 View Blog
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
              <button
                onClick={() => setError('')}
                className="float-right font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <PostForm onSubmit={handleCreatePost} isLoading={submitting} />
            </div>

            {/* Posts Section */}
            <div className="lg:col-span-2">
              {/* Filter Buttons */}
              <div className="mb-6 flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterVisibility('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterVisibility === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                  }`}
                >
                  All Posts ({posts.length})
                </button>
                <button
                  onClick={() => setFilterVisibility('public')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterVisibility === 'public'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                  }`}
                >
                  🌐 Public ({posts.filter((p) => p.visibility === 'public').length})
                </button>
                <button
                  onClick={() => setFilterVisibility('friends')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterVisibility === 'friends'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                  }`}
                >
                  👥 Friends ({posts.filter((p) => p.visibility === 'friends').length})
                </button>
                <button
                  onClick={() => setFilterVisibility('private')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterVisibility === 'private'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                  }`}
                >
                  🔒 Private ({posts.filter((p) => p.visibility === 'private').length})
                </button>
              </div>

              {/* Posts List */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 mt-4">Loading posts...</p>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500 text-lg">
                      {posts.length === 0
                        ? 'No posts yet. Create your first post!'
                        : 'No posts match the current filter.'}
                    </p>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <div key={post.id} className="relative">
                      <PostCard
                        post={post}
                        onDelete={handleDeletePost}
                      />
                      {post.visibility === 'private' && (
                        <button
                          onClick={() => {
                            setSharedPost(post);
                            setShowShareModal(true);
                          }}
                          className="absolute top-6 right-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded text-sm transition-colors"
                        >
                          📤 Share
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        postTitle={sharedPost?.title || ''}
        currentVisibility={sharedPost?.visibility || 'private'}
        onClose={() => setShowShareModal(false)}
        onChangeVisibility={handleChangeVisibility}
        isLoading={sharingLoading}
      />
    </>
  );
}
