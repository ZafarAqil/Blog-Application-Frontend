import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { VoteService } from 'src/app/shared/vote.service';
import { voteType } from 'src/app/models/voteType';
import { ToastrService } from 'ngx-toastr';
import {
  faComments,
  faArrowUp,
  faArrowDown,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { CommunityService } from 'src/app/shared/community.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  faComments = faComments;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faAward = faAward;
  commentForm: FormGroup;
  post: any;
  comment: any;
  userId: any;
  postId: any;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private tokenService: TokenStorageService,
    private voteService: VoteService,
    private toastr: ToastrService,
    private communityService: CommunityService
  ) {
    this.commentForm = this.formBuilder.group({
      commentDescription: ['', [Validators.required]],
    });
    this.comment = {
      commentDescription: '',
    };
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }
    const param = this.route.snapshot.paramMap.get('pid');
    if (param) {
      this.postId = param;
      this.getPost(this.postId);
    }
  }

  postComment(form: FormGroup) {
    this.comment.commentDescription = form.get('commentDescription')?.value;
    this.userId = this.tokenService.getUser().id;
    if (!this.userId) {
      this.router.navigate(['signin']);
    }
    this.postService
      .postComment(this.comment, this.userId, this.postId)
      .subscribe((data) => console.log(data));
    form.reset();
    this.ngOnInit();
  }

  getPost(postId: number) {
    this.postService
      .getPostById(postId)
      .subscribe((data) => (this.post = data));
    console.log(this.post);
  }

  upvotePost(postId: number) {
    if (!this.isLoggedIn) this.toastr.error('Please, Login to vote');
    else {
      this.userId = this.tokenService.getUser().id;

      this.voteService.vote(voteType.UPVOTE, this.userId, postId).subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => {
          this.toastr.error(error.error.message);
          throwError(error);
        }
      );
    }
  }

  downvotePost(postId: number) {
    if (!this.isLoggedIn) this.toastr.error('Please, Login to vote');
    else {
      this.userId = this.tokenService.getUser().id;

      this.voteService.vote(voteType.DOWNVOTE, this.userId, postId).subscribe(
        (data) => {
          console.log(data);
          this.ngOnInit();
        },
        (error) => {
          this.toastr.error(error.error.message);
          throwError(error);
        }
      );
    }
  }
}
