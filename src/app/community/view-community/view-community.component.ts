import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/shared/community.service';
import { UserService } from 'src/app/shared/user.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { HeaderComponent } from 'src/app/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { faCheck, faPlus, faExternalLinkAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  user: any;
  joinedCommunities: string[] = [];
  isLoggedIn: boolean = false;
  roles: string[] = [];
  showAdminBoard: boolean = HeaderComponent.showAdminBoard;
  showModeratorBoard = HeaderComponent.showModeratorBoard;
  username: string = '';
  faCheck = faCheck;
  faPlus = faPlus;
  faExternalLinkAlt = faExternalLinkAlt;
  faTrash = faTrash;

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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.communityService.getCommunities().subscribe(
      (data) => {
        this.communities = data;
        this.filteredCommunities = data;
      },
      (err) => {
        this.error = JSON.parse(err.error).message;
      }
    );
    this.userService.getUserProfile(this.tokenService.getUser().username).subscribe((data) => {
      this.user = data;
      this.joinedCommunities = this.user[1];
    });
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

  leaveCommunity(communityId: number) {
    this.userService
      .leaveCommunity(communityId, this.tokenService.getUser().id)
      .subscribe((data) => {
        this.toastr.success(data.toString());
        this.ngOnInit();
      });
  }

  deleteCommunity(communityId: number) {
    this.communityService.deleteCommunity(communityId ,this.tokenService.getUser().id).subscribe(
      data => {
        this.toastr.success(data.toString());
        this.ngOnInit();
      }
    );
  }
}