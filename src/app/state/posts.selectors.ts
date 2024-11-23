import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';
import {Post} from "../models/post.model";

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectAllPostsState = createSelector(
  selectPostsState,
  (state: PostsState) => ({
    posts: state.posts,
    loading: state.loading,
    error: state.error,
  })
);

export const selectPostById = (postId: string) =>
  createSelector(selectPostsState, (state: PostsState) => {
    const post = state.posts.find((post: Post) => post.id === postId);

    if (post) {
      console.log('Post Found Locally:', post);
      return post;
    } else {
      console.log('Post Not Found Locally, Call API');
      return null;
    }
  });

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state: PostsState) => state.loading
);

export const selectPostsError = createSelector(
  selectPostsState,
  (state: PostsState) => state.error
);
