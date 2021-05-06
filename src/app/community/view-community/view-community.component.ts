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
  constructor(private communityService: CommunityService) { }
 
  ngOnInit(): void {
    // this.communityService.getCommunities().subscribe(data =>this.communities = data
    // );
    this.communityService.getCommunityById(2).subscribe(data => this.community = data);

    this.communityService.getCommunities().subscribe(
      data => {
        console.log(data);
        this.communities = data;
      },
      err => {
        this.error = JSON.parse(err.error).message;
      }
    );
  }

 
}
