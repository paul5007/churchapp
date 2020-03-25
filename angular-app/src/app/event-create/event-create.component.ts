import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  public form: FormGroup;
  public eventName: FormControl = new FormControl();
  public description: FormControl = new FormControl();
  public minVolunteers: FormControl = new FormControl();
  public maxVolunteers: FormControl = new FormControl();
  public eventStartTime: FormControl = new FormControl();
  public eventEndTime: FormControl = new FormControl();

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router:Router) {
    this.form = this.formBuilder.group({
      "eventName": this.eventName,
      "description": this.description,
      "minVolunteers": this.minVolunteers,
      "maxVolunteers": this.maxVolunteers,
      "eventStartTime": this.eventStartTime,
      "eventEndTime": this.eventEndTime
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.eventService.createNewEvent(this.eventName.value, this.description.value, this.minVolunteers.value, this.maxVolunteers.value, new Date(this.eventStartTime.value).valueOf(), new Date(this.eventEndTime.value).valueOf()).subscribe(resp => {
      if(resp != null) {
        this.router.navigate(['/event', resp.ID])
      }
    });
  }

}
