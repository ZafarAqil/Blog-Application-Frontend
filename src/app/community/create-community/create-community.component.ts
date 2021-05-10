import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Community } from 'src/app/models/community-model';
import { CommunityService } from 'src/app/shared/community.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {

  createSubredditForm: FormGroup;
  community: Community;
  moderatorId: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenStorageService,
    private communityService: CommunityService,
    private tokenStorage: TokenStorageService) {
    this.createSubredditForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(15)]],
      communityDescription: ['', [Validators.required, Validators.maxLength(40)]],
      image: ['', [Validators.required]],
    });

    this.community = {
      title: '',
      communityDescription: '',
      postRulesAllowed: [
        "Only Texts Allowed"
      ],
      postRulesDisallowed: [
        "Videos Not Allowed",
        "No Links Allowed"
      ],
      banningPolicy: [
        "NSFW Posts will lead to ban",
        "Doxxing will lead to ban"
      ],
      flairs: [
        "OC",
        "NSFW",
        "SPOILER"
    ],
    imageUrl: ''
    }
  }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/signin']);
    }
  }

  createSubreddit(form: FormGroup) {
    this.community.title = form.get('title')?.value;
    this.community.communityDescription = form.get('communityDescription')?.value;
    this.community.imageUrl = form.get('image')?.value;

    this.moderatorId = this.tokenService.getUser().id;
    if(!this.moderatorId){
      this.router.navigate(['signin']);
    }

    this.communityService.addCommunity(this.community, this.moderatorId).subscribe(data => console.log(data));

    form.reset();
    this.router.navigate(['/community'])
  }

  discard() {
    alert('discard button clicked');
  }
}

