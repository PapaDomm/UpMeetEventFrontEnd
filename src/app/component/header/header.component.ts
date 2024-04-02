import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LoginComponent } from '../login/login.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBarComponent, LoginComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  loginForm : boolean = false;

  changeClass():string{
    if(!this.loginForm){
      return "container-fluid mx-0 headerClass"
    }
    else{
      return "container-fluid mx-0 headerClassBig"
    }
  }

  loginChange(formDisplay : boolean){
    this.loginForm = formDisplay;
  }
}
