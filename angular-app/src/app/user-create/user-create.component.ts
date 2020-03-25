import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public form: FormGroup;
  public username: FormControl = new FormControl();
  public password: FormControl = new FormControl();
  public email: FormControl = new FormControl();

  public failedUsername: boolean = false;
  public failedPassword: boolean = false;
  public failedCreate: boolean = false;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      "username": this.username,
      "password": this.password,
      "email": this.email
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    console.log(this.username.value + " " + this.password.value)
    if (this.username.value == null || this.username.value == "") {
      this.failedUsername = true;
    }
    if (this.password.value == null || this.password.value == "") {
      this.failedPassword = true;
    }
    if (this.failedUsername || this.failedPassword) {
      return;
    }
    this.userService.createNewUser(this.username.value, this.password.value, this.email.value).subscribe(resp => {
      if (resp === undefined) {
        this.form.reset();
        this.failedCreate = true;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

}
