import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post-model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})

export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  post: Post;

  constructor(private formBuilder: FormBuilder) {
    this.createPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      notSafeForWork: [''],
      spoiler: [''],
      originalContent: [''],
    });
    this.post = {
      title: '',
      description: '',
      content: '',
      notSafeForWork: false,
      spoiler: false,
      originalContent: false,
      flairs: [],
    };
  }

  ngOnInit(): void {}

  createPost(form: FormGroup) {
    this.post.title = form.get('title')?.value;
    this.post.description = form.get('description')?.value;
    this.post.notSafeForWork = form.get('notSafeForWork')?.value ? true : false;
    this.post.spoiler = form.get('spoiler')?.value ? true : false;
    this.post.originalContent = form.get('originalContent')?.value
      ? true
      : false;
    this.post.flairs = form.get('flairs')?.value;

    console.log(this.post);
    form.reset();
  }

  discardPost() {}
}
