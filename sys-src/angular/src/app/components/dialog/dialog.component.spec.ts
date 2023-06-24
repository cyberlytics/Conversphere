import { provideHttpClient } from '@angular/common/http';
import {provideHttpClientTesting }
from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog.component';

describe('UsernameComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;
    beforeEach(async () => {
  
      await TestBed.configureTestingModule({
        imports: [ DialogComponent, NoopAnimationsModule ],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
  
          provideRouter([]),
        ],
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
});  