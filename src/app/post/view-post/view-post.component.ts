import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  commentForm: FormGroup
  post: any;
  comment: any;
  userId: any;
  postId: any;

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private tokenService: TokenStorageService
    ) {
    this.commentForm = this.formBuilder.group({
      commentDescription: ['', [Validators.required]]
    });
    this.comment = {
      commentDescription: ''
    };

  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('pid');
    if (param) {
      this.postId = +param;
      this.getPost(this.postId);
    }
  }

  postComment(form: FormGroup) {
    this.comment.commentDescription = form.get('commentDescription')?.value;
    this.userId = this.tokenService.getUser().id;

    this.postService.postComment(this.comment, this.userId, this.postId).subscribe(data => console.log(data));
    form.reset();
    this.ngOnInit();
  }

  getPost(postId: number) {
    this.postService.getPostById(postId).subscribe(data => this.post = data);
    console.log(this.post);
  }
}
