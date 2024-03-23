import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private userService: UserService){}

  // Ask Justin if fix for this pause/buffer between clicks

  display: boolean = false;

  toggleDisplay(){
    this.display = !this.display
  }

  activeUser():UserModel{
    return this.userService.activeUser;
  }
}
