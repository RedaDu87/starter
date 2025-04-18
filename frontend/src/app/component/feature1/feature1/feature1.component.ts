import { Component } from '@angular/core';
import {User} from "../../../interface/user";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-feature1',
  templateUrl: './feature1.component.html',
  styleUrls: ['./feature1.component.css']
})
export class Feature1Component {
  isAuthenticated: boolean = false;
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();

    if (this.isAuthenticated) {
      this.userService.profile$().subscribe(response => {
        this.user = response.data.user;
      });
    }  else {
      this.user = null;
    }
  }


  ngAfterViewChecked(): void {
    this.isAuthenticated = this.userService.isAuthenticated();

    if (this.isAuthenticated) {
      this.userService.profile$().subscribe(response => {
        this.user = response.data.user;
      });
    } else {
      this.user = null;
    }
  }
}
