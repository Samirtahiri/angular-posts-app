import { createAction, props } from '@ngrx/store';

export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: any[] }>()
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
  props<{ post: any }>()
);
export const loadPostByIdFailure = createAction(
  '[Posts] Load Post By ID Failure',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Posts] Create Post',
  props<{ post: any }>()
);

export const createPostSuccess = createAction(
  '[Posts] Create Post Success',
  props<{ post: any }>()
);

