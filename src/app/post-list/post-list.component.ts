import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {deletePostById, loadPosts} from '../state/posts.actions';
import {selectAllPostsState, selectPostsState} from '../state/posts.selectors';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {Post} from "../models/post.model";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  postsState$: Observable<{
    posts: Post[];
    loading: boolean;
    error: string | null;
  }>;

  constructor(private store: Store) {
    this.postsState$ = this.store.select(selectAllPostsState);
  }

  deletePostById(postId: string) {
    console.log('id', postId);
    this.store.dispatch(deletePostById({ id: postId }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }
}
