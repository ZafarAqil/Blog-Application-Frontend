import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Community } from 'src/app/models/community-model';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {

  createSubredditForm: FormGroup;
  community: Community;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.createSubredditForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      communityDescription: ['', [Validators.required]],
    });

    this.community = {
      title: '',
      communityDescription: '',
      postRulesAllowed: [],
      postRulesDisallowed: [],
      banningPolicy: [],
      flairs: []
    }
  }

  ngOnInit(): void {
  }

  createSubreddit(form: FormGroup) {
    this.community.title = form.get('title')?.value;
    this.community.communityDescription = form.get('communityDescription')?.value;
    this.community.postRulesAllowed = form.get('postRulesAllowed')?.value;
    this.community.postRulesDisallowed = form.get('postRulesDisallowed')?.value;
    this.community.flairs = form.get('flairs')?.value;

    console.log(this.community);
    form.reset();
  }

  discard() {
    alert('discard button clicked');
  }
}

