import { provideHttpClient } from '@angular/common/http';
import {provideHttpClientTesting }
from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;
    beforeEach(async () => {
  
      await TestBed.configureTestingModule({
        imports: [ GameComponent, NoopAnimationsModule ],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
  
          provideRouter([]),
        ],
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(GameComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
});  