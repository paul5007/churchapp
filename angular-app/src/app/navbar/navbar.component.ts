import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public currentUser;

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }

  public logout() {
    this.userService.logout();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

}
