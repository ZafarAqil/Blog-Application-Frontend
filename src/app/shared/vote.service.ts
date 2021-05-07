import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { voteType } from '../models/voteType';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  baseURL: string = `http://localhost:9090`;

  constructor(private httpClient: HttpClient) { }

  vote(vote: voteType, userId: number, postId: number) {
    return this.httpClient.put(this.baseURL + `/community/blogger/${userId}/post/${postId}/vote`, vote);
  }

}
