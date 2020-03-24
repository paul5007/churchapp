import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "eventName": this.eventName,
      "description": this.description,
      "minVolunteers": this.minVolunteers,
      "maxVolunteers": this.maxVolunteers
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
  }

}
