import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../shared/community.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  communities: any[] = [];
  error: any = '';
  isLoggedIn: boolean = false;
  constructor(
    private communityService: CommunityService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }
    this.communityService.getCommunities().subscribe(
      // data => {
      //   this.communities = data;
      // },
      (data) => {
        console.log(data);
        this.communities = data;

        if (data.length > 4) {
          this.communities = data.reverse().splice(0, 4);
        } else {
          this.communities = data;
        }
      },
      (err) => {
        this.error = JSON.parse(err.error).message;
      }
    );
  }
}​​​​​​​
 


