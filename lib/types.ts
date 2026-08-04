export type PostVisibility = 'public' | 'private' | 'friends';

export interface Post {
  id: string;
  title: string;
  content: string;
  visibility: PostVisibility;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  visibility: PostVisibility;
}
