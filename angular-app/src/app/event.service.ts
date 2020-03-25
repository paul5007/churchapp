import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private userService: UserService) { }

  private basePath = 'https://9grr2cnefd.execute-api.us-east-1.amazonaws.com/dev';

  public readEvent(id): Observable<any> {
    const url = this.basePath + "/event/";
    return this.http.get(url + id);
  }

  public readAllEvents(): Observable<any> {
    const url = this.basePath + "/event/readall";
    return this.http.get(url);
  }

  public getUserEvents(username: String): Observable<any> {
    const url = this.basePath + "/event/role/read/" + username;
    return this.http.get(url);
  }

  public createNewEvent(eventName: String, description: String, minVolunteers: number, maxVolunteers: number, eventStartTime: number, eventEndTime: number): Observable<any> {
    const url = this.basePath + "/event/create";
    var create = {
      "eventName": eventName,
      "description": description,
      "minVolunteers": minVolunteers,
      "maxVolunteers": maxVolunteers,
      "eventStartTime": eventStartTime,
      "eventEndTime": eventEndTime,
      "username": this.userService.getCurrentUser()
    };
    return this.http.post(url, JSON.stringify(create));
  }
}
