import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

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
      this.userService.setCurrentUser(resp.token);
      this.router.navigate(['/profile']);
    })
  }

}
