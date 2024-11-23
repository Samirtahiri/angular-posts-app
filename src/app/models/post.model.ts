import {User} from "./user.model";
import { Comment } from "./comment.model";

export interface Post {
  id: string;
  title: string;
  body: string;
  user?: User;
  comments?: {
    data: Comment[];
  };
}


export interface CreatePostInput {
  title: string;
  body: string;
  userId: string;
}

