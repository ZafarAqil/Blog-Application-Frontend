import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommunityService {


  baseURL: string = `http://localhost:9090`;
 
  constructor(private httpClient: HttpClient) {}
 
  getCommunities() :Observable<any>{
    console.log('getCommu')
    return this.httpClient.get(`${this.baseURL}/communities`);
  }
 
  getCommunityById(id: number):Observable<any> {
    return this.httpClient.get(`${this.baseURL}/community/${id}`,httpOptions);
  }
}