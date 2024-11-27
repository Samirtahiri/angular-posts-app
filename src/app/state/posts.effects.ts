import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo } from 'apollo-angular';
import { catchError, map, of, switchMap } from 'rxjs';
import {GET_POSTS_QUERY, GET_POST_QUERY, DELETE_POST_MUTATION, UPDATE_POST_MUTATION} from '../graphql/posts.queries';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
  loadPostById,
  loadPostByIdSuccess,
  loadPostByIdFailure,
  createPost,
  createPostSuccess,
  deletePostById,
  deletePostByIdSuccess,
  deletePostByIdFailure,
  updatePostById,
  updatePostByIdSuccess, updatePostByIdFailure,
} from './posts.actions';
import {Post} from "../models/post.model";

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private apollo: Apollo) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(() =>
        this.apollo
          .watchQuery<any>({ query: GET_POSTS_QUERY })
          .valueChanges.pipe(
          map((result) => loadPostsSuccess({ posts: result.data.posts.data })),
          catchError((error) => of(loadPostsFailure({ error: error.message })))
        )
      )
    )
  );

  loadPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostById),
      switchMap(({ id }) =>
        this.apollo
          .watchQuery<any>({ query: GET_POST_QUERY, variables: { id } })
          .valueChanges.pipe(
          map((result) => {
            const apiPost = result.data.post;

            // Merge API Data if necessary
            const mergedPost = {
              ...apiPost,
              user: apiPost.user?.name && apiPost.user?.email ? apiPost.user : null,
              comments: apiPost.comments?.data || [],
            };

            return loadPostByIdSuccess({ post: mergedPost });
          }),
          catchError((error) => of(loadPostByIdFailure({ error: error.message })))
        )
      )
    )
  );


  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      map(({ post }) => createPostSuccess({ post })) // Directly update state
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePostById),
      switchMap(({ id }) =>
        this.apollo.mutate<{ deletePost: boolean }>({
          mutation: DELETE_POST_MUTATION,
          variables: { id },
          refetchQueries: [
            {
              query: GET_POSTS_QUERY,
            },
          ],
        }).pipe(
          map((result) => {
            console.log('Delete Mutation Result:', result); // Debugging log
            return deletePostByIdSuccess({ id });
          }),
          catchError((error) => {
            console.error('Delete Mutation Error:', error); // Debugging log
            return of(deletePostByIdFailure({ error: error.message }));
          })
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePostById),
      switchMap(({ id, newPostData }) =>
        this.apollo.mutate<{ updatePost: { id: string; title: string; body: string } }>({
          mutation: UPDATE_POST_MUTATION,
          variables: { id, input: newPostData },
        }).pipe(
          map((result) => {
            const updatedPost = result.data?.updatePost;
            if (updatedPost) {
              return updatePostByIdSuccess({
                id,
                updatedPost: {
                  title: updatedPost.title,
                  body: updatedPost.body,
                },
              });
            } else {
              throw new Error('No data returned from server');
            }
          }),
          catchError((error) => of(updatePostByIdFailure({ error: error.message })))
        )
      )
    )
  );


}
