'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, PostVisibility } from '@/lib/types';
import PostCard from '@/components/PostCard';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterVisibility, setFilterVisibility] = useState<PostVisibility | 'all'>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts');
      const data = await response.json();

      if (data.success) {
        // Filter to show only public and friends posts (not private)
        const publicPosts = data.data.filter(
          (p: Post) => p.visibility === 'public' || p.visibility === 'friends'
        );
        setPosts(publicPosts);
      }
    } catch (err) {
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts =
    filterVisibility === 'all'
      ? posts
      : posts.filter((p) => p.visibility === filterVisibility);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📚 Blog</h1>
            <p className="text-gray-600">
              Discover posts from our community
            </p>
          </div>
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            ✍️ My Dashboard
          </Link>
        </div>

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
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">
                {posts.length === 0
                  ? 'No posts yet. Check back soon!'
                  : 'No posts match the current filter.'}
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
