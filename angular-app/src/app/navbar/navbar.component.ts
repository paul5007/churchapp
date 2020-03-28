import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public currentUser;
  private currentUserSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.currentUserSubscription = this.userService.subscribeCurrentUser().subscribe(resp => {
      this.currentUser = resp;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
