'use client';

import { PostVisibility } from '@/lib/types';

interface ShareModalProps {
  isOpen: boolean;
  postTitle: string;
  currentVisibility: PostVisibility;
  onClose: () => void;
  onChangeVisibility: (visibility: PostVisibility) => Promise<void>;
  isLoading?: boolean;
}

const visibilityOptions: {
  value: PostVisibility;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    value: 'private',
    label: 'Private',
    icon: '🔒',
    description: 'Only you can see this post',
  },
  {
    value: 'friends',
    label: 'Friends Only',
    icon: '👥',
    description: 'Share with your friends',
  },
  {
    value: 'public',
    label: 'Public',
    icon: '🌐',
    description: 'Everyone can see this post',
  },
];

export default function ShareModal({
  isOpen,
  postTitle,
  currentVisibility,
  onClose,
  onChangeVisibility,
  isLoading = false,
}: ShareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-in">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Post</h2>
          <p className="text-sm text-gray-600 line-clamp-2">"{postTitle}"</p>
        </div>

        <div className="space-y-3 mb-6">
          {visibilityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChangeVisibility(option.value)}
              disabled={isLoading}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                currentVisibility === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-600">{option.description}</div>
                </div>
                {currentVisibility === option.value && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
