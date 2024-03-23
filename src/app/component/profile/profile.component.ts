import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserModel } from '../../models/user';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, NavBarComponent, UserUpdateFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router){  }
  
  userProfile : UserModel = {} as UserModel

  displayUserUpdateForm : boolean = false;


  ngOnInit(){
    this.routeIdentifier()
  }

  createImgPath(path : string){
    return `${this.userService.url}${path}`
  }

  activeUser():UserModel{
    return this.userService.activeUser;
  }

  toggleDisplayUpdate(){
    this.displayUserUpdateForm = !this.displayUserUpdateForm
  }

  routeIdentifier(){
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      let id = Number(paramMap.get('id'));
      this.userService.getById(id).subscribe((response) => {
        this.userProfile = response;
      },
      (error) => {
        this.router.navigate(["/NotFound"])
      }
      )
    })
  }

  deleteUser(){
    this.userService.deleteUser(this.activeUser().userId).subscribe((response) => {
      this.userService.activeUser = {} as UserModel;
      this.userService.isLoggedIn = false;
      this.router.navigate(["/Home"]);
    });
    
  }
}
