import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule, MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule, MatDatepickerModule, MatButtonModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './/app-routing.module';
import { PlayerComponent } from './player/player.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddgameComponent } from './addgame/addgame.component';
import { TeamlistComponent } from './teamlist/teamlist.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerlistComponent,
    PlayerComponent,
    NavbarComponent,
    AddgameComponent,
    TeamlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
