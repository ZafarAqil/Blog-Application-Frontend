import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommunityService } from '../shared/community.service';
import { faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css'],
})
export class ModeratorComponent implements OnInit {
  communities: any[] = [];
  modCommunities: any[] = [];
  username: any = HeaderComponent.username;
  filteredModCommunities: any;
  faExternalLinkAlt = faExternalLinkAlt;

  private _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredModCommunities = this.performFilter(value);
  }

  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.communityService.getCommunities().subscribe((data) => {
      this.communities = data;
      this.filterCommunity(this.communities);
    });
  }

  filterCommunity(data: any) {
    for (let community of data) {
      if (community.moderatorName === HeaderComponent.username) {
        this.modCommunities.push(community);
        this.filteredModCommunities = this.modCommunities;
      }
    }
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.modCommunities.filter((community) =>
      community.title.toLocaleLowerCase().includes(filterBy)
    );
  }
}
