import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';

import { StartpageComponent } from './startpage.component';
import { UsernameComponent } from '../username/username.component';
import { GameConnectionService } from 'src/app/services/api-connection.service';
import { Room } from 'src/app/interfaces/rooms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StartpageComponent', () => {
  let component: StartpageComponent;
  let fixture: ComponentFixture<StartpageComponent>;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let gameConnectionService: GameConnectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        StartpageComponent,
        UsernameComponent,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatSliderModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatListModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [GameConnectionService, HttpClient, HttpHandler],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartpageComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(MatSnackBar);
    gameConnectionService = TestBed.inject(GameConnectionService);


    component.nickname.setValue('John Doe');
    component.selectedValue = 'Room 1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call copyToClipboard and open snackbar', () => {
  //   spyOn(document, 'createElement').and.returnValue({
  //     ,
  //     select: jasmine.createSpy('select'),
  //     remove: jasmine.createSpy('remove'),
  //   });
  //   spyOn(document.body, 'appendChild');
  //   spyOn(snackBar, 'open');

  //   component.copyToClipboard();

  //   expect(document.createElement).toHaveBeenCalledWith('textarea');
  //   expect(document.body.appendChild).toHaveBeenCalled();
  //   expect(snackBar.open).toHaveBeenCalled();
  // });

  it('should call joinRoom and navigate to the selected room', () => {
    const roomId = 'room123';
    const navigateSpy = spyOn(component.router, 'navigate');

    spyOn(component, 'findRoomIdWithName').and.returnValue(roomId);

    const room: Room = { id: 'room123', name: 'Room 1', description: 'Test Room' };
    spyOn(gameConnectionService, 'joinRoom').and.returnValue(of(room));

    component.joinRoom();

    expect(component.findRoomIdWithName).toHaveBeenCalledWith('Room 1', component.roomArray);
    expect(gameConnectionService.joinRoom).toHaveBeenCalledWith(roomId, 'John Doe');
    expect(navigateSpy).toHaveBeenCalledWith(['/room/' + roomId]);
  });

  it('should call createRoom and add the created room to the roomArray', () => {
    const createdRoom: Room = { id: 'room123', name: 'Room 1', description: 'Test Room' };
    spyOn(gameConnectionService, 'createRoom').and.returnValue(of(createdRoom));

    component.room_name.setValue('Room 1');
    component.description = 'Test Room';
    component.createNewRoom();

    expect(gameConnectionService.createRoom).toHaveBeenCalledWith('Room 1', 'Test Room');
    expect(component.createdRoom).toEqual(createdRoom);
    expect(component.selectedValue).toEqual('Room 1');
    expect(component.roomArray).toContain(createdRoom);
  });

  it('should call getRooms and populate the roomArray', () => {
    const roomArray: Room[] = [
      { id: 'room1', name: 'Room 1', description: 'Test Room 1' },
      { id: 'room2', name: 'Room 2', description: 'Test Room 2' },
    ];
    spyOn(gameConnectionService, 'getRooms').and.returnValue(of(roomArray));

    component.getRooms();

    expect(gameConnectionService.getRooms).toHaveBeenCalled();
    expect(component.roomArray).toEqual(roomArray);
  });

});
