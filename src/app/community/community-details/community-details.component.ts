import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from 'src/app/shared/community.service';
import { faComments, faArrowUp, faArrowDown, faAward } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { VoteService } from 'src/app/shared/vote.service';
import { voteType } from 'src/app/models/voteType';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css']
})
export class CommunityDetailsComponent implements OnInit {

  faComments = faComments;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faAward = faAward;
  community: any;
  filteredPosts: any;
  userId: any;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPosts = this.performFilter(value);
  }

  constructor(private route: ActivatedRoute, private communityService: CommunityService,
     private voteService: VoteService, private tokenService: TokenStorageService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id'))
    {
      const param = this.route.snapshot.paramMap.get('id');
      if(param) {
        console.log(param);
        const id = +param;
        this.getCommunityById(id);
      }
    }
    else (this.route.snapshot.paramMap.get('title'))
    {
      const param = this.route.snapshot.paramMap.get('title');
      if(param) {
        const title = param;
        this.getCommunityByTitle(title);
      }
    }
  }

  getCommunityById(id: number) {
    this.communityService.getCommunityById(id).subscribe(
      data => {
        this.community = data;
        this.filteredPosts = this.community.posts;
      });
  }
  getCommunityByTitle(title: string) {
    this.communityService.getCommunityByTitle(title).subscribe(
      data => {
        this.community = data;
        this.filteredPosts = this.community.posts;
      });
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.community.posts.filter((post: { title: string; description: string; }) =>
      post.title.toLocaleLowerCase().includes(filterBy) || post.description.toLocaleLowerCase().includes(filterBy));
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
  // change() {
  //   for (let post of this.community.posts) {
  //     post.createdDateTime = new Date(post.createdDateTime);
  //   }
  // }
}