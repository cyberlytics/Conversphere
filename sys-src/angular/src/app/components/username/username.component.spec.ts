import { provideHttpClient } from '@angular/common/http';
import {provideHttpClientTesting }
from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsernameComponent } from './username.component';

describe('UsernameComponent', () => {
    let component: UsernameComponent;
    let fixture: ComponentFixture<UsernameComponent>;
    beforeEach(async () => {
  
      await TestBed.configureTestingModule({
        imports: [ UsernameComponent, NoopAnimationsModule ],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
  
          provideRouter([]),
        ],
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(UsernameComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
});  