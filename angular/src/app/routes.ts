import { Routes } from '@angular/router';
import { StartpageComponent } from './components/startpage/startpage.component';
import { ErrorComponent } from './components/error/error.component';
import { LebenslaufComponent } from './components/lebenslauf/lebenslauf.component';
import { LoginComponent } from './components/login/login.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { Component } from '@angular/core';
import { GameComponent } from './components/game/game.component';

export const APP_ROUTES: Routes = [
  {
    path: 'start',
    component: StartpageComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
  {
    path: 'startpage',
    component: StartpageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'chatroom',
    component: ChatroomComponent,
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'error',
  },
];
