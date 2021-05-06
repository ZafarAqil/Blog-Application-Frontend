import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from 'src/app/shared/community.service';
import { faComments, faArrowUp, faArrowDown, faAward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css']
})
export class CommunityDetailsComponent implements OnInit {

  faComments = faComments;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faAward = faAward;
  community: any;
  constructor(private route: ActivatedRoute, private communityService: CommunityService) { }
 
  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('cid');
    if (param) {
      const cid = +param;
      this.getCommunity(cid);
    }
  }
 
  getCommunity(cid: number) {
    this.communityService.getCommunityById(cid).subscribe(
      data => this.community = data,
    );
  }
 
  change() {
    for (let post of this.community.posts) {
      post.createdDateTime = new Date(post.createdDateTime);
    }
  }
}