import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from '../models/community-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  baseURL: string = `http://localhost:9090`;

  constructor(private httpClient: HttpClient) { }

  getCommunities(): Observable<any> {
    console.log('getCommu')
    return this.httpClient.get<any>(`${this.baseURL}/communities`, httpOptions);
  }

  getCommunityById(id: number): Observable<Community> {
    return this.httpClient.get<Community>(`${this.baseURL}/community/${id}`, httpOptions);
  }

  getCommunityByTitle(title: string): Observable<Community> {
    return this.httpClient.get<Community>(`${this.baseURL}/communityByTitle/${title}`, httpOptions);
  }

  addCommunity(community: any, moderatorId: number) {
    return this.httpClient.post(this.baseURL + `/community/${moderatorId}`, community, httpOptions)
  }

  deleteCommunity(communityId: number, adminId: number) {
    return this.httpClient.delete(this.baseURL + `/admin/${adminId}/community/${communityId}`, httpOptions)
  }

}