import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: any;
  user: any

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('username');
    if (param) {
      this.username = param;
      this.getUserProfile(this.username);
    }
  }

  getUserProfile(username: string) {
    this.userService.getUserProfile(username).subscribe(data => console.log(data));
  }
}
