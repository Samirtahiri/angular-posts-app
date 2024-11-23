import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {Router, RouterLink} from '@angular/router';
import { createPostSuccess } from '../state/posts.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from "../models/user.model";
import { Comment } from "../models/comment.model";
import {Post} from "../models/post.model";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent {
  title: string = '';
  body: string = '';
  user: User = { id: '1', name: '', email: '' };
  comments: Comment[] = [
    { id: '101', name: 'Commenter 1', email: 'commenter1@example.com', body: 'First comment' },
    { id: '102', name: 'Commenter 2', email: 'commenter2@example.com', body: 'Second comment' },
  ];

  constructor(private store: Store, private router: Router) {}

  addComment() {
    this.comments.push({
      id: Date.now().toString(),
      name: '',
      email: '',
      body: '',
    });
  }

  removeComment(index: number) {
    this.comments.splice(index, 1);
  }

  createPost() {
    const newPost: Post = {
      id: Date.now().toString(),
      title: this.title,
      body: this.body,
      user: {
        id: '13123213213213',
        name: this.user.name || 'User Name',
        email: this.user.email || 'user@example.com',
      },
      comments: {
        data: this.comments || [],
      },
    };

    this.store.dispatch(createPostSuccess({ post: newPost }));
    this.router.navigate(['/']);
  }
}
