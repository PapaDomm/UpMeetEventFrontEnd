import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventModel } from '../../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _newEvent = new BehaviorSubject<EventModel>({} as EventModel);
  readonly newEvent = this._newEvent.asObservable();
  constructor(private http: HttpClient) { }

  url: string = "https://localhost:7193/";

  getAllEvents():Observable<EventModel[]>{
    return this.http.get<EventModel[]>(`${this.url}api/Event`)
  }

  getEventById(id : number):Observable<EventModel>{
    return this.http.get<EventModel>(`${this.url}api/Event/${id}`)
  }

  deleteEvent(id: number){
    return this.http.delete(`${this.url}api/Event/${id}`)
  }

  updateEvent(targetEvent: FormData, id : number):Observable<EventModel>{
    return this.http.put<EventModel>(`${this.url}api/Event/${id}`, targetEvent)
  }

  addNewEvent(newEvent : FormData):Observable<EventModel>{
    return this.http.post<EventModel>(`${this.url}api/Event`, newEvent)
  }

  setNewEvent(event : EventModel){
    this._newEvent.next(event);
  }

  getNewEvent():EventModel{
    return this._newEvent.getValue();
  }
}
