import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public login(username, password) {
    this.userService.getCurrentUser(username, password);
    if (this.userService.currentUser != null) {
      window.location.href = this.userService.basePath;
    }
  }

  public submit() {
    this.userService.getCurrentUser('pfa5007', 'demo123').subscribe(resp => {
      this.userService.setCurrentUser('pfa5007');
      console.log(this.userService.currentUser);
    })
  }

}
