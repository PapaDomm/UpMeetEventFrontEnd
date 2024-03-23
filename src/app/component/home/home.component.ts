import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EventsListComponent } from '../events-list/events-list.component';
import { Router, RouterLink } from '@angular/router';
import { AddEventFormComponent } from '../add-event-form/add-event-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, EventsListComponent, RouterLink, AddEventFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  addEventDisplay : boolean = false;

  toggleAddEventForm(){
    this.addEventDisplay = !this.addEventDisplay;
  }
}
