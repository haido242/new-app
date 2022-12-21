import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './model/user.model';

// const httpOptions ={
//   headers:new HttpHeaders({'Content-Type':'Application/json'})
// }
const apiUrl = 'http://localhost:3001/'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  getAll():Observable<User[]>{
    return this.httpClient.get<User[]>(apiUrl+"getListUser")
  }
  find(id:any):Observable<User>{
    return this.httpClient.get<User>(apiUrl+"getUser/"+id).pipe()
  }
  update(id:any, user:any):Observable<User>{
    return this.httpClient.put<User>(apiUrl+"updateUser/" + id, user)
  }
  create(user:any):Observable<User>{
    return this.httpClient.post<User>(apiUrl + "createUser", user)
  }
  del(id : any):Observable<User>{
    return this.httpClient.delete<User>(apiUrl+"delete/"+id)
  }
}
