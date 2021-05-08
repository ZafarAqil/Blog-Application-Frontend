import { Component, OnInit } from '@angular/core';
import { ModeratorComponent } from '../moderator/moderator.component';
import { TokenStorageService } from '../shared/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private roles: string[]=[];
  isLoggedIn = false;
 public static  showAdminBoard = false;
 public static showModeratorBoard = false;
 isModerator =false;
 isAdmin =false;
 public static username: string='';
 name :string = '';

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      HeaderComponent.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.isAdmin=HeaderComponent.showAdminBoard;
      HeaderComponent.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.isModerator=HeaderComponent.showModeratorBoard;
      HeaderComponent.username = user.username;
      this.name=HeaderComponent.username
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
