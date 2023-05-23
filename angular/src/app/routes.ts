
import { Routes } from '@angular/router';
import { StartpageComponent } from './components/startpage/startpage.component';
import { ErrorComponent } from './components/error/error.component';
import { LebenslaufComponent } from './components/lebenslauf/lebenslauf.component';
import { AuthComponent } from './components/login/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';



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
        path: 'login',
        component: LoginComponent
    },{
        path: 'chatroom',
        component: ChatroomComponent
    },
    {
        path: '',
        component: ChatroomComponent
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
