import { Routes } from '@angular/router';
import { StartpageComponent } from './components/startpage/startpage.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'error',
  },
];
