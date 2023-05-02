import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { 
    PreloadAllModules, 
    provideRouter, 
    withDebugTracing, 
    withPreloading, 
    withRouterConfig 
} 
from '@angular/router';

import { APP_ROUTES } from './app/routes';
import { HttpClientModule } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
      provideRouter(APP_ROUTES, 
        withPreloading(PreloadAllModules),
        withDebugTracing(),
      ),
    ],
})
  .catch(err => console.error(err));
