import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SummonerComponent} from "./summoner/summoner.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LeaderboardsComponent} from "./leaderboards/leaderboards.component";
import {FreeRotationComponent} from "./free-rotation/free-rotation.component";
import {FavoritesComponent} from "./favorites/favorites.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'summoners/:regionCode/:summonerName', component: SummonerComponent },
  { path: 'leaderboards', component: LeaderboardsComponent },
  { path: 'free-rotation', component: FreeRotationComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
