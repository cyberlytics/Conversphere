import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { GameComponent } from './game.component';
import { ChatService } from 'src/app/services/chat.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let chatServiceSpy: jasmine.SpyObj<any>; //gpt

  beforeEach(async () => {
    chatServiceSpy = jasmine.createSpyObj('ChatService', ['SendMessage']);  //gpt
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
    providers: [{ provide: ChatService, useValue: chatServiceSpy }], //gpt
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

  it('Sollte Playerstyles anpassen, bzw, Position der Spieler prozentual gleich lassen', () => {
    const playerElement: HTMLElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(playerElement);
    const event = new Event('resize');
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

  it('Sollte eigene Spielerposition bei Mausclick ändern und eigenen User updaten', () => {
    const playerElement: HTMLElement = document.createElement('div');
    spyOn(document, 'getElementById').and.callFake((id: string) => {
      if (id === 'Spieler') {
        return playerElement;
      } else if (id === 'gamefield') {
        return document.createElement('div');
      }
      return null;
    });
    spyOn(window, 'getComputedStyle').and.returnValue({ top: '100px' } as any);
    const event = new MouseEvent('click', {
      clientX: 200,
      clientY: 300,
    });
    const chatServiceSpy = spyOn(component['chatservice'], 'userUpdate');
    component.onClickAtDiv(event);
    expect(playerElement.style.position).toBe('absolute');
    expect(playerElement.style.left).toBe('200px');
    expect(playerElement.style.top).toBe('200px'); 
    expect(component.prozentualplayerheight).toBe(100 / window.innerHeight); 
    expect(component.prozentualplayerwidth).toBe(200 / window.innerWidth);
    expect(component.user.position.x).toBe(100 / window.innerHeight);
    expect(component.user.position.y).toBe(200 / window.innerWidth);
    expect(chatServiceSpy).toHaveBeenCalledWith(component.user);
  });

  it('Sollte Fehlermeldung für fehlenden Spieler ausgeben', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    spyOn(console, 'log');
    const event = new MouseEvent('click');
    component.onClickAtDiv(event);
    expect(console.log).toHaveBeenCalledWith('player not found in DOM');
  });
  //gpt
  it('Sollte Chatnachricht absenden und input leeren', () => {
    const message = 'Test Message';
    component.messageControl.setValue(message);
    component.sendMessage();
    expect(component.messageControl.value).toBe('');
    expect(chatServiceSpy.SendMessage).toHaveBeenCalledWith(message);
  });

  it('Sollte keine Message senden wenn input leer/message ist', () => {
    component.messageControl.setValue('');
    component.sendMessage();
    expect(chatServiceSpy.SendMessage).not.toHaveBeenCalled();
  });
});
