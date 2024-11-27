import { createAction, props } from '@ngrx/store';
import {Post} from "../models/post.model";

export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: string }>()
);

export const loadPostById = createAction(
  '[Posts] Load Post By ID',
  props<{ id: string }>()
);
export const loadPostByIdSuccess = createAction(
  '[Posts] Load Post By ID Success',
  props<{ post: Post }>()
);
export const loadPostByIdFailure = createAction(
  '[Posts] Load Post By ID Failure',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Posts] Create Post',
  props<{ post: Post }>()
);

export const createPostSuccess = createAction(
  '[Posts] Create Post Success',
  props<{ post: Post }>()
);

export const deletePostById = createAction(
  '[Posts] Delete Post By ID',
  props<{ id: string }>()
);
export const deletePostByIdSuccess = createAction(
  '[Posts] Delete Post By ID Success',
  props<{ id: string }>()
);
export const deletePostByIdFailure = createAction(
  '[Posts] Delete Post By ID Failure',
  props<{ error: string }>()
);
export const updatePostById = createAction(
  '[Posts] Update Post By ID',
  props<{ id: string; newPostData: { title: string; body: string } }>()
);
export const updatePostByIdSuccess = createAction(
  '[Posts] Update Post By ID Success',
  props<{ id: string; updatedPost: { title: string; body: string } }>()
);
export const updatePostByIdFailure = createAction(
  '[Posts] Update Post By ID Failure',
  props<{ error: string }>()
);

