
import { Routes } from '@angular/router';
import { StartpageComponent } from './components/startpage/startpage.component';
import { ErrorComponent } from './components/error/error.component';
import { LebenslaufComponent } from './components/lebenslauf/lebenslauf.component';

export const APP_ROUTES: Routes = [
    {
        path: 'start',
        component: StartpageComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: 'lebenslauf',
        component: LebenslaufComponent
    },
    {
        path: '', 
        redirectTo: 'start', 
        pathMatch: 'full'
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'error'
    },
];