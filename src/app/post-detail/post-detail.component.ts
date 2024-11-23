import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Store } from '@ngrx/store';
import {map, Observable, of, switchMap, tap} from 'rxjs';
import {selectPostById} from '../state/posts.selectors';
import {CommonModule} from "@angular/common";
import {GET_POST_QUERY} from "../graphql/posts.queries";
import {Apollo} from "apollo-angular";
import {Post} from "../models/post.model";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  post$!: Observable<Post | null>;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private store: Store, private apollo: Apollo) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap((id: string | null) => {
        if (!id) {
          this.loading = false;
          return of(null);
        }

        return this.store.select(selectPostById(id)).pipe(
          switchMap((localPost: Post) => {
            if (localPost) {
              return this.apollo
                .watchQuery<any>({
                  query: GET_POST_QUERY,
                  variables: { id },
                })
                .valueChanges.pipe(
                  map((result) => {
                    const apiPost = result.data.post;

                    const mergedPost = {
                      ...localPost,
                      user: apiPost.user?.name && apiPost.user?.email ? apiPost.user : localPost.user,
                      comments: {
                        data: [
                          ...(localPost.comments?.data || []),
                          ...(apiPost.comments?.data || []),
                        ],
                      },
                    };

                    this.loading = false;
                    return mergedPost;
                  })
                );
            } else {
              return this.apollo
                .watchQuery<any>({
                  query: GET_POST_QUERY,
                  variables: { id },
                })
                .valueChanges.pipe(
                  map((result) => {
                    this.loading = false;
                    return result.data.post;
                  })
                );
            }
          })
        );
      })
    );
  }
}
