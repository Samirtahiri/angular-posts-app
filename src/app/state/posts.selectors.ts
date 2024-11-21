import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectAllPostsState = createSelector(
  selectPostsState,
  (state) => ({
    posts: state.posts,
    loading: state.loading,
    error: state.error,
  })
);

export const selectPostById = (postId: string) =>
  createSelector(selectPostsState, (state) => {
    const post = state.posts.find((post) => post.id === postId);

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
  (state) => state.loading
);

export const selectPostsError = createSelector(
  selectPostsState,
  (state) => state.error
);
