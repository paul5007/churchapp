import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private userService: UserService) {
    // TODO Remove this after building form
    this.userService.getCurrentUser('pfa5007', 'demo123').subscribe(resp => {
      if (resp.status == 200) {
        this.userService.setCurrentUser(resp.username);
        console.log(resp.username)
      }
    })
  }


}
