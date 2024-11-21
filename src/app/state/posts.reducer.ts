import { createReducer, on } from '@ngrx/store';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
  loadPostById,
  loadPostByIdSuccess,
  loadPostByIdFailure,
  createPost,
  createPostSuccess,
} from './posts.actions';

export interface PostsState {
  posts: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsReducer = createReducer(
  initialState,
  on(loadPosts, (state) => ({ ...state, loading: true, error: null })),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    loading: false,
    posts: [
      ...state.posts,
      ...posts.filter((apiPost) => !state.posts.some((localPost) => localPost.id === apiPost.id)),
    ],
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadPostById, (state) => ({ ...state, loading: true, error: null })),
  on(loadPostByIdSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    posts: [...state.posts.filter((p) => p.id !== post.id), post],
  })),
  on(loadPostByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(createPost, (state) => ({ ...state, loading: true, error: null })),
  on(createPostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
  }))
);
