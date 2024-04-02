import { Component } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventModel, User } from '../../models/event';
import { UserModel } from '../../models/user';
import { DatePipe } from '@angular/common';
import { EventFormComponent } from '../event-form/event-form.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UserFavorite } from '../../models/user-favorite';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [DatePipe, RouterLink, EventFormComponent, NavBarComponent, HeaderComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {
  constructor(private eventService: EventService, private userService: UserService, private activatedRoute : ActivatedRoute, private router: Router){}

  displayEvent : EventModel = {} as EventModel

  formDisplay : boolean = false;

  ngOnInit(){
    this.routeIdentifier();
  }

  routeIdentifier(){
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      let id = Number(paramMap.get('id'));
      this.eventService.getEventById(id).subscribe((response) => {
        this.displayEvent = response;
      },
      (error) => {
        this.router.navigate(["/NotFound"])
      }
      )
    })
  }

  createImgPath(path : string){
    return `${this.userService.url}${path}`
  }

  activeUser():UserModel{
    return this.userService.activeUser;
  }
  
  isLoggedIn():boolean{
    return this.userService.isLoggedIn;
  }

  deleteEvent(){
    this.eventService.deleteEvent(this.displayEvent.eventId).subscribe((response) => {
      this.router.navigate(["/Home"]);
    });
  }

  toggleFormDisplay(){
    this.formDisplay = !this.formDisplay;
  }

  containsEvent(){
    return this.userService.activeUser.events.some((e) => e.eventId === this.displayEvent.eventId);
  }

  addToFavs(id : number){
    let newFav : UserFavorite = {
      userId : this.userService.activeUser.userId,
      eventId : id
    } 
    this.userService.addToFavs(newFav).subscribe((response) => {
      this.userService.activeUser = response;
      this.displayEvent.users.push(this.activeUser())
    })
  }

  removeFavs(id : number){
    let remFav : UserFavorite = {
      userId : this.userService.activeUser.userId,
      eventId : id
    } 
    this.userService.removeFav(remFav).subscribe((response) => {
      this.userService.activeUser = response;
      let target : User[] = this.displayEvent.users.filter((user) => user.userId == this.activeUser().userId);
      let index : number = this.displayEvent.users.indexOf(target[0]);
      this.displayEvent.users.splice(index, 1);
    })
  }
}
