import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  post: any;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('pid');
    if (param) {
      const pid = +param;
      this.getPost(pid);
    }
  }

  getPost(postId: number) {
    this.postService.getPostById(postId).subscribe(data => this.post=data);
    console.log(this.post);
  }
}
