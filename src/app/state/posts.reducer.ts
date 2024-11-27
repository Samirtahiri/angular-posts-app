import { createReducer, on } from '@ngrx/store';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
  loadPostById,
  loadPostByIdSuccess,
  loadPostByIdFailure,
  createPost,
  createPostSuccess, deletePostByIdSuccess, updatePostById, updatePostByIdSuccess, updatePostByIdFailure,
} from './posts.actions';
import {Post} from "../models/post.model";

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
  on(loadPosts, (state: PostsState) => ({ ...state, loading: true, error: null })),
  on(loadPostsSuccess, (state: PostsState, { posts }) => ({
    ...state,
    loading: false,
    posts: [
      ...state.posts,
      ...posts.filter((apiPost: Post) => !state.posts.some((localPost: Post) => localPost.id === apiPost.id)),
    ],
  })),
  on(loadPostsFailure, (state: PostsState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadPostById, (state: PostsState) => ({ ...state, loading: true, error: null })),
  on(loadPostByIdSuccess, (state: PostsState, { post }) => ({
    ...state,
    loading: false,
    posts: [...state.posts.filter((p) => p.id !== post.id), post],
  })),
  on(loadPostByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(createPost, (state: PostsState) => ({ ...state, loading: true, error: null })),
  on(createPostSuccess, (state: PostsState, { post }) => ({
    ...state,
    posts: [...state.posts, post],
  })),
  on(deletePostByIdSuccess, (state: PostsState, { id }) => ({
    ...state,
    loading: false,
    posts: state.posts.filter((p) => p.id !== id),
  })),
    on(loadPostByIdFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  on(updatePostById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(updatePostByIdSuccess, (state: PostsState, { id, updatedPost  }) => ({
    ...state,
    loading: false,
    posts: state.posts.map((post) =>
      post.id === id ? { ...post, ...updatedPost } : post
    ),
  })),
  on(updatePostByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
