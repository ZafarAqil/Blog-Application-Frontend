import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = `http://localhost:9090`;

  constructor(private httpClient: HttpClient) { }

  getUserProfile(username: string) {
    return this.httpClient.get(this.baseURL + `/bloggers/${username}`, httpOptions);
  }

  joinCommunity(communityId: number, userId: number) {
    return this.httpClient.put(this.baseURL + `/blogger/${communityId}/${userId}`, httpOptions);
  }

  deleteBlogger(bloggerId: number) {
    return this.httpClient.delete(this.baseURL + `/blogger/${bloggerId}`, httpOptions);
  }
}
