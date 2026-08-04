import { CommentPost } from './comment.interface';
import { Profile } from '@tt/interfaces/profile';

export interface PostCreateDto {
  title?: string;
  content: string;
  authorId: number;
}

export interface Post {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  likesUsers: string[];
  comments: CommentPost[];
}
