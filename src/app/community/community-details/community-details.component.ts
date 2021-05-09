import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from 'src/app/shared/community.service';
import {
  faComments,
  faArrowUp,
  faArrowDown,
  faAward,
  faBook,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { VoteService } from 'src/app/shared/vote.service';
import { voteType } from 'src/app/models/voteType';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css'],
})
export class CommunityDetailsComponent implements OnInit {
  faComments = faComments;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faAward = faAward;
  faBook = faBook;
  faTrash = faTrash;
  community: any;
  filteredPosts: any;
  userId: any;
  isLoggedIn: boolean = false;
  username: string = HeaderComponent.username;
  communities: any[] = [];
  displayViewAll: any;
  error = '';
  isAdmin: boolean = HeaderComponent.showAdminBoard;
  isPostsAvailable: boolean=false;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPosts = this.performFilter(value);
  }

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private voteService: VoteService,
    private tokenService: TokenStorageService,
    private toastr: ToastrService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }

    if (this.route.snapshot.paramMap.get('id')) {
      const param = this.route.snapshot.paramMap.get('id');
      if (param) {
        console.log(param);
        const id = +param;
        this.getCommunityById(id);
      }
    } else this.route.snapshot.paramMap.get('title');
    {
      const param = this.route.snapshot.paramMap.get('title');
      if (param) {
        const title = param;
        this.getCommunityByTitle(title);
      }
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

  getCommunityById(id: number) {
    this.communityService.getCommunityById(id).subscribe((data) => {
      this.community = data;
      this.filteredPosts = this.community.posts;
      if(this.filteredPosts){
        this.isPostsAvailable=true;
      }
    },
      (error) => {
        this.toastr.error(error.error.message);
        // setTimeout(() => {
        //   this.router.navigate(['page_not_found']);
        // }, 400);
        //throwError(error);
        this.router.navigate(['page_not_found']);
      }
    );
  }
  getCommunityByTitle(title: string) {
    this.communityService.getCommunityByTitle(title).subscribe((data) => {
      if (!data) {
        this.toastr.error('Community Not Found');
        // setTimeout(() => {
        //   this.router.navigate(['page_not_found']);
        // }, 400);
        this.router.navigate(['page_not_found']);
      }
      else {
        this.community = data;
        this.filteredPosts = this.community?.posts;
        console.log(this.community);
      }
    });
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.community.posts.filter(
      (post: { title: string; description: string }) =>
        post.title.toLocaleLowerCase().includes(filterBy) ||
        post.description.toLocaleLowerCase().includes(filterBy)
    );
  }

  // upvotePost(postId: number) {
  //   this.userId = this.tokenService.getUser().id;

  //   this.voteService.vote(voteType.UPVOTE, this.userId, postId).subscribe(data => {
  //     this.ngOnInit();
  //   }, error => {
  //     this.toastr.error(error.error.message);
  //     throwError(error);
  //   });
  // }

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

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(data => {
      this.toastr.success(data.toString());
      this.ngOnInit();
    })
  }
}
// change() {
//   for (let post of this.community.posts) {
//     post.createdDateTime = new Date(post.createdDateTime);
//   }
// }
