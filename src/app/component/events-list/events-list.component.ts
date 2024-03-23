import { Component } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { EventModel } from '../../models/event';
import { EventsDetailsComponent } from '../events-details/events-details.component';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [EventsDetailsComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  constructor(private eventService: EventService){}

  eventList : EventModel[] = [];

  

  ngOnInit(){
    this.getAllEvents();
  }

  getAllEvents(){
    this.eventService.getAllEvents().subscribe((response) => {
      this.eventList = response;
    })
  }
}
