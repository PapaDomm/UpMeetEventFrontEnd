import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-user-update-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-update-form.component.html',
  styleUrl: './user-update-form.component.css'
})
export class UserUpdateFormComponent {
  constructor(private userService:UserService, private router: Router){}

  fileName : string = '';

  firstName : string = '';

  lastName : string = '';

  userName : string = '';

  bio : string = '';

  password : string = '';

  userForm : FormData = new FormData();

  onFileSelected(event : any) {
    const file : File = event.target.files[0];

    if(file){
      this.fileName = file.name;
      this.userForm.append("Image", file);
      this.userForm.append("filename", file.name);

    }
  }

  uploadUser(){

    this.userForm.append("FirstName", this.firstName)
    this.userForm.append("LastName", this.lastName)
    this.userForm.append("UserName", this.userName)
    this.userForm.append("Password", this.password)
    this.userForm.append("Bio", this.bio)
    this.userService.updateUser(this.userForm, this.activeUser().userId).subscribe((response) => {
      this.fileName = '';
      this.firstName = '';
      this.lastName = '';
      this.userName = '';
      this.bio = '';
      this.password = '';
      this.userForm = new FormData();
      this.userService.activeUser = response;
      this.router.navigate([`/Profile/${this.activeUser().userId}`])
    })
  }

  activeUser():UserModel{
    return this.userService.activeUser;
  }
}
