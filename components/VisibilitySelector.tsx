'use client';

import { PostVisibility } from '@/lib/types';

interface VisibilitySelectorProps {
  value: PostVisibility;
  onChange: (value: PostVisibility) => void;
}

export default function VisibilitySelector({
  value,
  onChange,
}: VisibilitySelectorProps) {
  const options: { value: PostVisibility; label: string; description: string }[] =
    [
      {
        value: 'public',
        label: '🌐 Public',
        description: 'Everyone can see this post',
      },
      {
        value: 'friends',
        label: '👥 Friends Only',
        description: 'Only your friends can see this',
      },
      {
        value: 'private',
        label: '🔒 Private',
        description: 'Only you can see this post',
      },
    ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Post Visibility
      </label>
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              value === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="font-semibold text-sm">{option.label}</div>
            <div className="text-xs text-gray-600 mt-1">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
