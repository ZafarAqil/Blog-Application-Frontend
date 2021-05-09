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
  faComment,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { CommunityService } from 'src/app/shared/community.service';
import { AwardType } from 'src/app/models/awardType';
import { HeaderComponent } from 'src/app/header/header.component';

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
  faComment = faComment;
  faTrash = faTrash;
  commentForm: FormGroup;
  post: any;
  comment: any;
  userId: any;
  postId: any;
  isLoggedIn: boolean = false;
  communities: any[] = [];
  displayViewAll: any;
  error = '';
  community: any;
  username: string = HeaderComponent.username;
  count = { PLATINUM: 0, GOLD: 0, SILVER: 0, REGULAR: 0 };

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
      commentDescription: ['', [Validators.required, Validators.maxLength(255)]],
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
    this.communityService.getCommunities().subscribe(
      (data) => {
        console.log(data);
        this.communities = data;

        if (data.length > 3) {
          this.communities = data.reverse().splice(0, 3);
          this.displayViewAll = true;
        } else {
          this.communities = data;
        }
      },
      (err) => {
        this.error = JSON.parse(err.error).message;
      }
    );
  }

  postComment(form: FormGroup) {
    this.comment.commentDescription = form.get('commentDescription')?.value;
    this.userId = this.tokenService.getUser().id;
    if (!this.userId) {
      this.router.navigate(['signin']);
    }
    this.postService
      .postComment(this.comment, this.userId, this.postId)
      .subscribe((data) => {
        form.reset();
        this.ngOnInit();
        console.log(data);
      });
  }

  getPost(postId: number) {
    this.postService
      .getPostById(postId)
      .subscribe(data => {
        this.post = data;
        this.awardCount();
      },
        (error) => {
          this.toastr.error(error.error.message);
          setTimeout(() => {
            this.router.navigate(['page_not_found']);
          }, 300);
        }
      );
    console.log(this.post);
  }

  awardCount() {
    this.count = { PLATINUM: 0, GOLD: 0, SILVER: 0, REGULAR: 0 };
    this.post.awardsReceived.forEach((award: { awardType: any; }) => {
      switch (award.awardType) {
        case "PLATINUM": this.count.PLATINUM += 1; break;
        case "GOLD": this.count.GOLD += 1; break;
        case "SILVER": this.count.SILVER += 1; break;
        case "REGULAR": this.count.REGULAR += 1; break;
      }
    });
  }

  giveAward(id: number) {
    let award: AwardType = id;
    this.postService.giveAward(award, this.tokenService.getUser().id, this.postId).subscribe(
      data => {
        this.toastr.success(AwardType[award] + ' ' + data.toString());
        this.ngOnInit();
      });
  }

  deleteComment(commentId: number) {
    this.userId = this.tokenService.getUser().id;
    this.postService.deleteComment(this.userId, this.postId, commentId).subscribe(
      data => {
        this.toastr.success(data.toString());
        this.ngOnInit();
      }
    );
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
