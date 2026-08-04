export interface CommentCreateDto {
  text: string;
  authorId: number;
  postId: number;
}

export interface CommentPost {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}
