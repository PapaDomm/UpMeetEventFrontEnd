import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { EventPageComponent } from './component/event-page/event-page.component';
import { SearchComponent } from './component/search/search.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "Home", component: HomeComponent},
    {path: "Profile/:id", component: ProfileComponent},
    {path: "Event/:id", component: EventPageComponent},
    {path: "RegisterUser", component : RegisterComponent},
    {path: "SearchEvents", component : SearchComponent},
    {path: "**", component: HomeComponent}
];
