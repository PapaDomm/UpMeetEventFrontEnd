import { Component, Input } from '@angular/core';
import { EventModel, User } from '../../models/event';
import { EventService } from '../../services/event/event.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserModel } from '../../models/user';
import { UserFavorite } from '../../models/user-favorite';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-events-details',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './events-details.component.html',
  styleUrl: './events-details.component.css'
})
export class EventsDetailsComponent {
  constructor(private eventService: EventService, private userService: UserService){}

  displayUser : boolean = false;

  @Input() displayEvent = {} as EventModel;

  createImgPath(path : string):string{
    return `${this.eventService.url}${path}`; 
  }

  toggleUserDisplay(){
    this.displayUser = !this.displayUser;
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

  containsEvent(){
    return this.userService.activeUser.events.some((e) => e.eventId === this.displayEvent.eventId);
  }

  isLoggedIn(){
    return this.userService.isLoggedIn
  }

  activeUser():UserModel{
    return this.userService.activeUser;
  }

  cardClass():string{
    if(this.isLoggedIn() && this.displayUser){
      return 'card cardUserAlter'
    }
    else if(this.isLoggedIn()){
      return 'card cardAlter'
    }
    else if(this.displayUser){
      return 'card cardUserDisplay'
    }
    else{
      return 'card'
    }
  }
}
