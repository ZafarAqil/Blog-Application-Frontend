import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.isSuccessful = true;
    this.isSignUpFailed = false;
    console.log(this.form);
  }
}
