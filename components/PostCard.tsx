'use client';

import { Post, PostVisibility } from '@/lib/types';

interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) => void;
  onEdit?: (post: Post) => void;
}

const visibilityIcons: Record<PostVisibility, string> = {
  public: '🌐',
  friends: '👥',
  private: '🔒',
};

const visibilityLabels: Record<PostVisibility, string> = {
  public: 'Public',
  friends: 'Friends Only',
  private: 'Private',
};

export default function PostCard({ post, onDelete, onEdit }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl">{visibilityIcons[post.visibility]}</span>
            <span className="text-sm text-gray-600">
              {visibilityLabels[post.visibility]}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(post)}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              className="text-red-600 hover:text-red-800 font-semibold text-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {post.authorName} • {formatDate(post.createdAt)}
        </span>
        {post.updatedAt !== post.createdAt && (
          <span className="text-xs text-gray-400">
            Updated {formatDate(post.updatedAt)}
          </span>
        )}
      </div>
    </div>
  );
}
