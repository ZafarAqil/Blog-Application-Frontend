import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = ['User'];

  constructor() {}
  ngOnInit() {
    this.isLoggedIn = false;
  }
  onSubmit() {
    this.isLoggedIn = true;
    console.log(this.form.value);
  }
  reloadPage() {
    window.location.reload();
  }
}
