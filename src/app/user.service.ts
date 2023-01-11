import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './model/user.model';

const apiUrl = 'http://localhost:3001/';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl + 'getListUser');
  }
  find(id: any): Observable<User> {
    return this.httpClient.get<User>(apiUrl + 'getUser/' + id).pipe();
  }
  update(id: any, user: any): Observable<User> {
    return this.httpClient.put<User>(apiUrl + 'updateUser/' + id, user);
  }
  create(user: any): Observable<User> {
    return this.httpClient.post<User>(apiUrl + 'createUser', user);
  }
  search(searchValue: any) {
    return this.httpClient.get(apiUrl + 'search/' + searchValue);
  }
  del(id: any): Observable<User> {
    return this.httpClient.delete<User>(apiUrl + 'delete/' + id);
  }
  getAllAndPagination(params: any): Observable<User[]> {
    let paramsDefault = { page: '1', limit: '10' };
    params = Object.assign({}, paramsDefault, params);
    let newParams = new URLSearchParams(params).toString();
    return this.httpClient.get<User[]>(apiUrl + `getListUsers?${newParams}`);
  }
  getByDateRange(date: any): Observable<any> {
    date = { dateStart: date[0].getTime(), dateEnd: date[1].getTime() };
    date = new URLSearchParams(date).toString();
    return this.httpClient.get<User[]>(apiUrl + 'getByDate/?' + date);
  }
  test(params: any): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl + `getListUsers?${params}`);
  }
}
