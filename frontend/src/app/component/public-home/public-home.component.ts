import {AfterContentInit, AfterViewChecked, Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../interface/user";

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.css']
})
export class PublicHomeComponent implements OnInit , AfterViewChecked{
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
