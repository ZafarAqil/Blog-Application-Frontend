import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/shared/community.service';
 
@Component({
  selector: 'app-view-community',
  templateUrl: './view-community.component.html',
  styleUrls: ['./view-community.component.css']
})
export class ViewCommunityComponent implements OnInit {
 
  community: any;
  communities:any=[];
  constructor(private communityService: CommunityService) { }
 
  ngOnInit(): void {
    // this.communityService.getCommunities().subscribe(data =>this.communities = data
    // );
    this.communityService.getCommunityById(1).subscribe(data => this.community = data);
  }
 
}
