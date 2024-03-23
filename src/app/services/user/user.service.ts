import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserModel } from '../../models/user';
import { UserFavorite } from '../../models/user-favorite';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  activeUser : UserModel = {} as UserModel;

  isLoggedIn : boolean = false;

  url: string = "https://localhost:7193/";

  login(username: string, password : string):Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}api/User/Login?username=${username}&password=${password}`)
  }

  getById(id : number):Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}api/User/${id}`);
  }

  addToFavs(newFav : UserFavorite):Observable<UserModel>{
    return this.http.put<UserModel>(`${this.url}api/User/AddToFavorites`, newFav)
  }

  removeFav(remFav : UserFavorite):Observable<UserModel>{
    return this.http.put<UserModel>(`${this.url}api/User/RemoveFavorites`, remFav)
  }

  uploadUser(newUser: FormData):Observable<UserModel>{
    return this.http.post<UserModel>(`${this.url}api/User`, newUser);
  }

  updateUser(targetUser: FormData, id : number):Observable<UserModel>{
    return this.http.put<UserModel>(`${this.url}api/User/${id}`, targetUser)
  }

  deleteUser(id : number){
    return this.http.delete(`${this.url}api/User/${id}`);
  }
}
