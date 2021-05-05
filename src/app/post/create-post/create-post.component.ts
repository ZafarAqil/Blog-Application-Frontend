import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post-model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  post: Post;

  constructor(private formBuilder : FormBuilder) { 
    this.createPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.post = {
      title: '',
      description: '',
      content: '',
      notSafeForWork: false,
      Spoiler: false,
      originalContent: false,
      flairs: []
    }
  }

  ngOnInit(): void {
  }

  createPost() {
    
  }

  discardPost() {
    
  }
}
