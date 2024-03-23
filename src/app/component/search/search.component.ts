import { Component } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { UserService } from '../../services/user/user.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EventModel } from '../../models/event';
import { DatePipe } from '@angular/common';
import { EventsDetailsComponent } from '../events-details/events-details.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NavBarComponent, FormsModule, RouterLink, DatePipe, EventsDetailsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private eventService: EventService, private userService : UserService){}

  nameFilter : string = '';
  cityFilter : string = '';
  stateFilter : string = '';
  expiredFilter : string = '';
  startDateFilter : Date = new Date('');
  endDateFilter : Date = new Date('');



  allEvents : EventModel[] = []
  filteredEvents : EventModel[] = []

  ngOnInit(){
    this.getAllEvents();
  }

  getAllEvents(){
    this.eventService.getAllEvents().subscribe((response) => {
      this.allEvents = response;
      this.filterEvents();
    })
  }

  filterEvents():void{
    if(this.nameFilter != '' && this.cityFilter != '' && this.stateFilter != ''){
      this.filteredEvents = this.allEvents.filter(e => e.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
      this.filteredEvents = this.filteredEvents.filter(e => e.city.toLowerCase().includes(this.cityFilter.toLowerCase()));
      this.filteredEvents = this.filteredEvents.filter(e => e.state == this.stateFilter);
    }
    else if(this.nameFilter != '' && this.cityFilter != ''){
      this.filteredEvents = this.allEvents.filter(e => e.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
      this.filteredEvents = this.filteredEvents.filter(e => e.city.toLowerCase().includes(this.cityFilter.toLowerCase()));
    }
    else if(this.nameFilter != '' && this.stateFilter != ''){
      this.filteredEvents = this.allEvents.filter(e => e.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
      this.filteredEvents = this.filteredEvents.filter(e => e.state == this.stateFilter);
    }
    else if(this.cityFilter != '' && this.stateFilter != ''){
      this.filteredEvents = this.allEvents.filter(e => e.city.toLowerCase().includes(this.cityFilter.toLowerCase()));
      this.filteredEvents = this.filteredEvents.filter(e => e.state == this.stateFilter);
    }
    else if(this.nameFilter != ''){
      this.filteredEvents = this.allEvents.filter(e => e.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
    }
    else if(this.cityFilter != ''){
      this.filteredEvents = this.allEvents.filter(e => e.city.toLowerCase().includes(this.cityFilter.toLowerCase()));
    }
    else if(this.stateFilter != ''){
      this.filteredEvents = this.allEvents.filter(e => e.state == this.stateFilter);
    }
    else{
      this.filteredEvents = this.allEvents;
    }
  }

  clearFilters():void{
    this.nameFilter = '';
    this.cityFilter = '';
    this.stateFilter = '';
    this.filterEvents();
  }
}
