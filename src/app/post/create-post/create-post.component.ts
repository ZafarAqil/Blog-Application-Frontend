import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Post, PostType } from 'src/app/models/post-model';
import { CommunityService } from 'src/app/shared/community.service';
import { PostService } from 'src/app/shared/post.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})

export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  post: Post;
  communities: any;
  communityId: any;
  userId: any;

  constructor(private formBuilder: FormBuilder,
    private communityService: CommunityService,
    private postService: PostService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {
    this.createPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      communityTitle: [''],
      notSafeForWork: [''],
      spoiler: [''],
      originalContent: [''],
    });
    this.post = {
      title: '',
      description: '',
      content: PostType.TEXT,
      notSafeForWork: false,
      spoiler: false,
      originalContent: false,
      flairs: [],
    };
  }

  ngOnInit(): void {
    this.communityService.getCommunities().subscribe(data => {
      this.communities = data;
    }, error => {
      throwError(error);
    });

    if (!this.tokenService.getToken()) {
      this.router.navigate(['/signin']);
    }
  }

  createPost(form: FormGroup) {
    this.post.title = form.get('title')?.value;
    this.post.description = form.get('description')?.value;
    this.post.notSafeForWork = form.get('notSafeForWork')?.value ? true : false;
    this.post.spoiler = form.get('spoiler')?.value ? true : false;
    this.post.originalContent = form.get('originalContent')?.value
      ? true
      : false;
    this.post.flairs = form.get('flairs')?.value;
    
    this.communityId = form.get('communityTitle')?.value;
    this.userId = this.tokenService.getUser().id;
    if(!this.userId){
      this.router.navigate(['signin']);
    }

    console.log(this.post);
    console.log(this.communityId);
    console.log(this.userId);

    this.postService.addPost(this.post, this.communityId, this.userId).subscribe(data => console.log(data));

    // form.reset();
    this.router.navigate(['communityId/', this.communityId])
  }

  discardPost() { }
}
