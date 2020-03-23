import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public username: FormControl = new FormControl();
  public password: FormControl = new FormControl();

  public failedLogin: boolean = false;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "username": this.username,
      "password": this.password
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    console.log(this.username.value)
    console.log(this.password.value)
    this.userService.getCurrentUser(this.username.value, this.password.value).subscribe(resp => {
      if (resp === null) {
        this.password.reset();
        this.failedLogin = true;
      } else {
        this.userService.setCurrentUser(resp.token);
        this.router.navigate(['/profile']);
      }
    });
  }
}
