import { Component } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-event-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-event-form.component.html',
  styleUrl: './add-event-form.component.css'
})
export class AddEventFormComponent {
  constructor(private eventService:EventService, private router: Router){}


  fileName : string = '';

  name : string = '';

  description : string = '';

  startDate : string = '';

  endDate : string = '';

  city : string = '';

  state : string = '';

  expired : string = '';

  eventForm : FormData = new FormData();

  onFileSelected(event : any) {
    const file : File = event.target.files[0];

    if(file){
      this.fileName = file.name;

      this.eventForm.append("Image", file);
      this.eventForm.append("filename", file.name);

    }
  }

  updateEvent(){
    this.eventForm.append("Name", this.name)
    this.eventForm.append("Description", this.description)
    this.eventForm.append("StartDate", this.startDate)
    this.eventForm.append("EndDate", this.endDate)
    this.eventForm.append("City", this.city)
    this.eventForm.append("State", this.state)
    this.eventForm.append("Expired", this.expired)
    this.eventService.addNewEvent(this.eventForm).subscribe((response) => {
      this.fileName = '';
      this.name = '';
      this.description = '';
      this.startDate = '';
      this.endDate = '';
      this.city = '';
      this.state = '';
      this.expired = '';
      this.eventForm = new FormData();
      // Change to reroute back to event page
      this.router.navigate(["/Home"])
    })
  }
}
