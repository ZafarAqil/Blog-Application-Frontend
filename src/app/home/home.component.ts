import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../shared/community.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  communities:any[]=[];
  error:any='';
  constructor(private communityService:CommunityService) { }

  ngOnInit(): void {
    this.communityService.getCommunities().subscribe(
      data => {
        this.communities = data;
      },
      err => {
        this.error = JSON.parse(err.error).message;
      }
    );
  }

}
