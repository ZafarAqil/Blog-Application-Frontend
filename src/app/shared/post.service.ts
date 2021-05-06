import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.httpClient.get(this.baseURL + `/post/${postId}`, httpOptions);
  }
}
