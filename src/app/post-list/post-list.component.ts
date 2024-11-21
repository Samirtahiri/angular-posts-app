import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPosts } from '../state/posts.actions';
import { selectPostsState } from '../state/posts.selectors';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  postsState$: Observable<{
    posts: any[];
    loading: boolean;
    error: string | null;
  }>;

  constructor(private store: Store) {
    this.postsState$ = this.store.select(selectPostsState);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }
}
