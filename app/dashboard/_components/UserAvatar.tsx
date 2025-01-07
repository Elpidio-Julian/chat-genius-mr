'use client';

import { useUser } from '@clerk/nextjs';

interface UserAvatarProps {
  userId: string;
}

export function UserAvatar({ userId }: UserAvatarProps) {
  const { user } = useUser();
  
  // If it's the current user, use their Clerk avatar
  if (user?.id === userId) {
    return (
      <img 
        src={user.imageUrl} 
        alt={user.username || 'User avatar'} 
        className="w-8 h-8 rounded-full"
      />
    );
  }

  // For other users, show a placeholder or fetch their avatar from your backend
  return (
    <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center">
      {userId.charAt(0).toUpperCase()}
    </div>
  );
} 