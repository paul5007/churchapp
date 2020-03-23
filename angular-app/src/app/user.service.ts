import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public currentUser;

  public basePath = 'https://9grr2cnefd.execute-api.us-east-1.amazonaws.com/dev';

  public getCurrentUser(username, password): Observable<any> {
    const url = this.basePath + "/user/login";
    var login = {
      "username": username,
      "password": password
    };

    return this.http.post(url, JSON.stringify(login));
  }

  public setCurrentUser(username) {
    this.currentUser = username;
  }
}
