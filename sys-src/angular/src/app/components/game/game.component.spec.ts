import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
    imports: [
      ReactiveFormsModule,
      MatIconModule,
      MatSliderModule,
      MatSidenavModule,
      MatToolbarModule,
      RouterTestingModule,
    ],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Sollte Component erstellen', () => {
    expect(component).toBeTruthy();
  });
  
  it('Sollte Wert von "opened" verändern wenn Button gedrückt wird', () => {
    const initialOpenedValue = component.opened;
    const button = fixture.nativeElement.querySelector('button[mat-icon-button]');
    button.click();
    expect(component.opened).toBe(!initialOpenedValue);
  });
  
  it('Sollte Chatnachricht absenden wenn Button gedrückt wird', () => {
    const message = 'Test';
    component.messageControl.setValue(message);
    const sendButton = fixture.nativeElement.querySelector('.buttonColor');
    sendButton.click();
  });
});
