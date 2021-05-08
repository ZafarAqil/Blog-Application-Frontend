import { Component, OnInit } from '@angular/core';
import { Community } from 'src/app/models/community-model';
import { CommunityService } from 'src/app/shared/community.service';
import { UserService } from 'src/app/shared/user.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { HeaderComponent } from 'src/app/header/header.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-community',
  templateUrl: './view-community.component.html',
  styleUrls: ['./view-community.component.css'],
})
export class ViewCommunityComponent implements OnInit {
  community: any;
  communities: any[] = [];
  error = '';
  filteredCommunities: any;
  isSubscribed: string[]= [];
  isLoggedIn:boolean=false;
  roles: string[]=[];
  showAdminBoard:boolean = HeaderComponent.showAdminBoard;
  showModeratorBoard = HeaderComponent.showModeratorBoard;
  username: string='';

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }


  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCommunities = this.performFilter(value);
  }

  constructor(
    private communityService: CommunityService,
    private userService: UserService,
    private tokenService: TokenStorageService,
    private toastr:ToastrService
  ) {}



  ngOnInit(): void {
    this.communityService.getCommunities().subscribe(
      (data) => {
        this.communities = data;
        this.filteredCommunities = data;
        this.filteredCommunities.isSubsribed = [];
        for(let community of this.communities){
          let flag = false;
          community.bloggers.forEach((blogger: { id: any; }) => {
            console.log(blogger);
            if(blogger.id === this.tokenService.getUser().id) flag = true;
          });
          if(flag) this.isSubscribed.push(community.title);
        }
        this.isSubscribed = this.isSubscribed.reverse();
        console.log(this.isSubscribed);
      },      (err) => {
        this.error = JSON.parse(err.error).message;
      }
    );
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.communities.filter((community) =>
      community.title.toLocaleLowerCase().includes(filterBy)
    );
  }

  joinCommunity(communityId: number) {
    this.userService
      .joinCommunity(communityId, this.tokenService.getUser().id)
      .subscribe((data) => {
        this.toastr.success(data.toString());
        this.ngOnInit();
      });
  }
}
