import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public event;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventService.readEvent(this.route.snapshot.paramMap.get('id')).subscribe(resp => {
      console.log(resp)
      this.event = resp
    });
  }

}
