import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AwardType } from '../models/awardType';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseURL: string = `http://localhost:9090`;

  constructor(private httpClient: HttpClient) { }

  addPost(post: any, communityId: number, userId: number) {
    return this.httpClient.post(this.baseURL + `/community/${communityId}/blogger/${userId}/post`, post, httpOptions)
  }

  getPostById(postId: number) {
    return this.httpClient.get(this.baseURL + `/post/${postId}`, httpOptions).pipe(
    );
  }

  deletePost(postId: number) {
    return this.httpClient.delete(this.baseURL + `/community/blogger/post/${postId}`, httpOptions);
  }

  postComment(comment: any, userId: number, postId: number) {
    return this.httpClient.post(this.baseURL + `/blogger/${userId}/posts/${postId}/comment`, comment, httpOptions);
  }

  giveAward(award: AwardType, userId: number, postId: number) {
    return this.httpClient.put(this.baseURL + `/community/blogger/${userId}/post/${postId}/award`, award, httpOptions);
  }
}
