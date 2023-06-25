import { provideHttpClient } from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting }
from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game.component';
import { FormControl } from '@angular/forms';

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

    it('Sollte Wert von "opened" verändern wenn Button gedrückt wird', () => {
      const initialOpenedValue = component.opened;
      const button = fixture.nativeElement.querySelector('button[mat-icon-button]');
      button.click();
      expect(component.opened).toBe(!initialOpenedValue);
    });

    it('Sollte Playerstyles anpassen, bzw, Position der Spieler prozentual gleich lassen', () => {
      const playerElement: HTMLElement = document.createElement('div');
      spyOn(document, 'getElementById').and.returnValue(playerElement);
      const event = new Event('resize');
      const windowWidth = 800;
      const windowHeight = 600;
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(windowWidth);
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(windowHeight);
      window.dispatchEvent(event);
      expect(playerElement.style.left).toBe((component.prozentualplayerwidth * window.innerWidth) + 'px');
      expect(playerElement.style.top).toBe((component.prozentualplayerheight * window.innerHeight) + 'px');
    });

    it('Sollte Chatfontsize anpassen', () => {
      const chatMessageElement: HTMLElement = document.createElement('div');
      spyOn(document, 'getElementById').and.returnValue(chatMessageElement);
      const event = new Event('resize');
      const windowWidth = 800;
      const windowHeight = 600;
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(windowWidth);
      spyOnProperty(window, 'innerHeight', 'get').and.returnValue(windowHeight);
      window.dispatchEvent(event);
      expect(chatMessageElement.style.fontSize).toBe((Math.min(windowWidth, windowHeight) / 40) + 'px');
    });

    it('Sollte Fehlermeldung für fehlenden Spieler ausgeben', () => {
      spyOn(document, 'getElementById').and.returnValue(null);
      spyOn(console, 'log');
      const event = new MouseEvent('click');
      component.onClickAtDiv(event);
      expect(console.log).toHaveBeenCalledWith('player not found in DOM');
    });
  

    it('Sollte eigene Spielerposition bei Mausclick ändern und eigenen User updaten', () => {
      const playerElement: HTMLElement = document.createElement('div');
      spyOn(document, 'getElementById').and.returnValue(playerElement);
      const event = new MouseEvent('click', {
        clientX: 200,
        clientY: 300,
      });
      const chatServiceSpy = spyOn(component['chatservice'], 'userUpdate');
      component.onClickAtDiv(event);
      expect(playerElement.style.position).toBe('absolute');
      expect(playerElement.style.left).toBe('200px');
      expect(playerElement.style.top).toBe('300px');
      expect(component.prozentualplayerheight).toBe(300 / window.innerHeight);
      expect(component.prozentualplayerwidth).toBe(200 / window.innerWidth);
      expect(component.user.position.x).toBe(300 / window.innerHeight);
      expect(component.user.position.y).toBe(200 / window.innerWidth);
      expect(chatServiceSpy).toHaveBeenCalledWith(component.user);
    });

    it('Sollte Chatnachricht absenden und input leeren', () => {
      const message = 'Test';
      const messageControl = new FormControl(message);
      component.messageControl = messageControl;
      const chatServiceSpy = spyOn(component['chatservice'], 'SendMessage');
      component.sendMessage();
      expect(component.messageControl.value).toBe('');
      expect(chatServiceSpy).toHaveBeenCalledWith({
        text: message,
        user_id: component.user.id,
        id: null,
        visibility: null
      });      
    });

    it('Sollte keine Message senden wenn input leer/message ist', () => {
      const message = '';
      const messageControl = new FormControl(message);
      component.messageControl = messageControl;
      const chatServiceSpy = spyOn(component['chatservice'], 'SendMessage');
      component.sendMessage();
      expect(chatServiceSpy).not.toHaveBeenCalled();
    });


    it('Sollte Chatnachricht absenden wenn Button gedrückt wird', () => {
      const message = 'Test';
      component.messageControl.setValue(message);
      const sendButton = fixture.nativeElement.querySelector('.buttonColor');
      const chatServiceSpy = spyOn(component['chatservice'], 'SendMessage');
      sendButton.click();
      expect(component.messageControl.value).toBe('');
      expect(chatServiceSpy).toHaveBeenCalledWith({
        text: message,
        user_id: component.user.id,
        id: null,
        visibility: null
      });   
    });

});  