import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommunityService } from '../shared/community.service';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {
communities:any[]=[];
public static modCommunities:any[]=[];
username:any =HeaderComponent.username;
  constructor(private CommunityService:CommunityService) { }

  ngOnInit(): void {
    this.CommunityService.getCommunities().subscribe(data=>{this.communities =data;
      filterCommunity(this.communities);
    console.log("Inside moderator ngOnInit")}
      );
  }


}




function filterCommunity(data: any) {
  for(let community of data){
    console.log("inside filter");
    console.log(community.moderatorName)
    if(community.moderatorName === HeaderComponent.username ){
      ModeratorComponent.modCommunities.push(community);
      console.log(ModeratorComponent.modCommunities);
    }
  }
}

