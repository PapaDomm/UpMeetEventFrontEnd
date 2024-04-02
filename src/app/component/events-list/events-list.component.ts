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

  empty : string[] = ['0', '0']

  ngOnInit(){
    this.getAllEvents();
    this.eventService.newEvent.subscribe((response) => {
      this.eventList.push(response);
    })
  }

  getAllEvents(){
    this.eventService.getAllEvents().subscribe((response) => {
      this.eventList = response;
    })
  }

}
