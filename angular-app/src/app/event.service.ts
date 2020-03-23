import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private basePath = 'https://abt1jgp1ze.execute-api.us-east-1.amazonaws.com/dev';

  public readAllEvents(): Observable<any> {
    const url = this.basePath + "/event/readall";
    return this.http.get(url);
  }

  public getUserEvents(username): Observable<any> {
    const url = this.basePath + "/event/read/" + username;
    return this.http.get(url);
  }
}
