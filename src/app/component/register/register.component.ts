import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
    this.userService.uploadUser(this.userForm).subscribe((response) => {
      this.fileName = '';
      this.firstName = '';
      this.lastName = '';
      this.userName = '';
      this.bio = '';
      this.password = '';
      this.userForm = new FormData();
      this.router.navigate(["/Home"])
    })
  }
}
