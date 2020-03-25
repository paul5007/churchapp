import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public event;
  public eventRoles;
  public currentUser: String = "";

  constructor(private eventService: EventService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventService.getEvent(this.route.snapshot.paramMap.get('id')).subscribe(resp => {
      this.event = resp
    });
    this.eventService.getEventRoles(this.route.snapshot.paramMap.get('id')).subscribe(resp => {
      this.eventRoles = resp;
    })
    this.currentUser = this.userService.getCurrentUser();
  }

}
