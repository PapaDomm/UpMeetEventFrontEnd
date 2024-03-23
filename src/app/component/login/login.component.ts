import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router){}

  username : string = '';
  password : string = '';

  displayForm : boolean = false;

  toggleDisplay(){
    this.displayForm = !this.displayForm;
  }

  login(username : string, password : string){
    this.userService.login(username, password).subscribe((response) => {
      this.userService.activeUser = response;
      this.userService.isLoggedIn = true;
      this.displayForm = false;
      this.username = '';
      this.password = '';
      this.router.navigate(["/Home"])
    })
    
  }

  logout(){
    this.userService.activeUser = {} as UserModel;
    this.userService.isLoggedIn = false;
    this.router.navigate(["/Home"])
  }

  activeUser(){
    return this.userService.activeUser;
  }

  isLoggedIn(){
    return this.userService.isLoggedIn;
  }
}
