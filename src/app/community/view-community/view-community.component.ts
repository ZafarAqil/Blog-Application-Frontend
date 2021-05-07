import { Component, OnInit } from '@angular/core';
import { Community } from 'src/app/models/community-model';
import { CommunityService } from 'src/app/shared/community.service';
 
@Component({
  selector: 'app-view-community',
  templateUrl: './view-community.component.html',
  styleUrls: ['./view-community.component.css']
})
export class ViewCommunityComponent implements OnInit {
 
  community: any;
  communities: any[] =[];
  error='';
  filteredCommunities: any;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCommunities = this.performFilter(value);
  }

  constructor(private communityService: CommunityService) { }
 
  ngOnInit(): void {
    this.communityService.getCommunities().subscribe(
      data => {
        console.log(data);
        this.communities = data;
        this.filteredCommunities = data;
      },
      err => {
        this.error = JSON.parse(err.error).message;
      }
    );
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.communities.filter(community =>
      community.title.toLocaleLowerCase().includes(filterBy));
  }
 
}
