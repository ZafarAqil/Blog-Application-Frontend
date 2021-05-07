import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import {
  faComments,
  faArrowUp,
  faArrowDown,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import { CommunityService } from 'src/app/shared/community.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { VoteService } from 'src/app/shared/vote.service';
import { voteType } from 'src/app/models/voteType';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  faComments = faComments;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faAward = faAward;

  community: any;
  communities: any[] = [];
  error = '';
  displayViewAll: any;

  username: any;
  user: any;
  userId: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private communityService: CommunityService,
    private tokenService: TokenStorageService,
    private voteService: VoteService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('username');
    if (param) {
      this.username = param;
      this.getUserProfile(this.username);
    }
    this.communityService.getCommunities().subscribe(
      (data) => {
        console.log(data);
        this.communities = data;

        if (data.length > 3) {
          this.communities = data.splice(0, 3);
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

  getUserProfile(username: string) {
    this.userService
      .getUserProfile(username)
      .subscribe((data) => (this.user = data));
    this.userService
      .getUserProfile(username)
      .subscribe((data) => console.log(data));
  }

  upvotePost(postId: number) {
    this.userId = this.tokenService.getUser().id;

    this.voteService.vote(voteType.UPVOTE, this.userId, postId).subscribe(data => {
      this.ngOnInit();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  downvotePost(postId: number) {
    this.userId = this.tokenService.getUser().id;

    this.voteService.vote(voteType.DOWNVOTE, this.userId, postId).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }
}