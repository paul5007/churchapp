import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private eventService: EventService) { }

  public currentUser;

  ngOnInit() {
    this.userService.currentUser;
    console.log(this.currentUser)
    this.eventService.getUserEvents(this.currentUser);
  }

}
