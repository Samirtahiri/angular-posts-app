import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { postsReducer } from './state/posts.reducer';
import { PostsEffects } from './state/posts.effects';

const uri = 'https://graphqlzero.almansi.me/api';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: PostListComponent },
      { path: 'post/:id', component: PostDetailComponent },
      { path: 'create', component: CreatePostComponent },
    ]),
    importProvidersFrom(ApolloModule),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    provideStore({ posts: postsReducer }),
    provideEffects([PostsEffects]),
  ],
};
