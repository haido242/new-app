import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from './model/group.model';

const apiUrl = 'http://localhost:3001/group/'
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private httpClient: HttpClient) { }
  getAll():Observable<Group[]>{
    return this.httpClient.get<Group[]>(apiUrl)
  }
  create(group: any):Observable<Group>{
    return this.httpClient.post<Group>(apiUrl,group)
  }
  del(id: any){
    return this.httpClient.delete<Group>(apiUrl + id)
  }
  update(id : any, group: any):Observable<Group>{
    return this.httpClient.put<Group>(apiUrl + id,group)
  }
}