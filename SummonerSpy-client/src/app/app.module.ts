import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchComponent } from './shared/search/search.component';
import { SummonerComponent } from './summoner/summoner.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {NgOptimizedImage} from "@angular/common";
import { NotFoundComponent } from './not-found/not-found.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { FreeRotationComponent } from './free-rotation/free-rotation.component';
import { MatchComponent } from './summoner/match/match.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    SearchComponent,
    SummonerComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    LeaderboardsComponent,
    FreeRotationComponent,
    MatchComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
