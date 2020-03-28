import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private currentUser = new BehaviorSubject<String>("");
  public readonly currentUserObservable = this.currentUser.asObservable();

  public basePath = 'https://9grr2cnefd.execute-api.us-east-1.amazonaws.com/dev';

  public loginUser(username, password) {
    const url = this.basePath + "/user/login";
    var login = {
      "username": username,
      "password": password
    };
    this.http.post(url, JSON.stringify(login)).subscribe(resp => {
      this.currentUser.next(resp['token']);
    });
  }

  public createNewUser(username, password, email): Observable<any> {
    const url = this.basePath + '/user/create';
    var create = {
      "username": username,
      "password": password,
      "email": email
    };
    return this.http.post(url, JSON.stringify(create));
  }

  public subscribeCurrentUser() {
    return this.currentUser.asObservable();
  }

  public getCurrentUser() {
    return this.currentUser.getValue();
  }

  public logout() {
    this.currentUser.next("");
  }
}
