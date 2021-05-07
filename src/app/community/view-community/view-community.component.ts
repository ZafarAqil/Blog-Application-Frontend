import { Component, OnInit } from '@angular/core';
import { Community } from 'src/app/models/community-model';
import { CommunityService } from 'src/app/shared/community.service';
import { UserService } from 'src/app/shared/user.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

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
  isSubscribed: boolean = false;

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
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.communityService.getCommunities().subscribe(
      (data) => {
        console.log(data);
        this.communities = data;
        this.filteredCommunities = data;
      },
      (err) => {
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
        console.log(data);
        this.isSubscribed = true;
      });
  }
}
