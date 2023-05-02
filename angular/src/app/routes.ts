
import { Routes } from '@angular/router';
import { StartpageComponent } from './components/startpage/startpage.component';
import { ErrorComponent } from './components/error/error.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'start'
    },
    {
        path: 'start',
        component: StartpageComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    },

 
    // Option 2: Directly Lazy Loading a Standalone Component
    {
        path: 'lebenslauf',
        loadComponent: () => 
            import('./components/lebenslauf/lebenslauf.component')
                .then(m => m.LebenslaufComponent)
    },
];