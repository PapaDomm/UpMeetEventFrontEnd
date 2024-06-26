import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  constructor(private eventService:EventService, private router: Router){}

  @Input() targetId = 0;
  @Output() outputChange = new EventEmitter();

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
    this.eventService.updateEvent(this.eventForm, this.targetId).subscribe((response) => {
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
      this.outputChange.emit();
    })
  }
}
