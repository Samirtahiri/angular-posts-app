import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo } from 'apollo-angular';
import { catchError, map, of, switchMap } from 'rxjs';
import { GET_POSTS_QUERY, GET_POST_QUERY } from '../graphql/posts.queries';
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
}
