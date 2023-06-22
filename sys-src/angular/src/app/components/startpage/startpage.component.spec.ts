import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartpageComponent } from './startpage.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, async, of } from 'rxjs';
import { GameConnectionService } from 'src/app/services/api-connection.service';
import { Room } from 'src/app/interfaces/rooms';

describe('StartpageComponent', () => {
  let component: StartpageComponent;
  let fixture: ComponentFixture<StartpageComponent>;
  let httpMock: HttpTestingController;
  let gameConnectionService: GameConnectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartpageComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatIconModule,
        MatSliderModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [MatDialog, MatSnackBar, GameConnectionService],
    }).compileComponents();

    fixture = TestBed.createComponent(StartpageComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    gameConnectionService = TestBed.inject(GameConnectionService);
    fixture.detectChanges();
  });

  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize roomArray with data from api', () => {
    const mockRoom: Room[] = [
      { id: '1', name: 'Room 1', description: 'Test room 1' },
      { id: '2', name: 'Room 2', description: 'Test room 2' },
    ];


    spyOn(gameConnectionService, 'getRooms').and.callFake(() => {
      return Observable.create((observer: { next: (arg0: Room[]) => void; complete: () => void; }) => {
        observer.next(mockRoom);
        observer.complete();
      });
    });
    
    component.ngOnInit();

    expect(component.roomArray.length).toEqual(mockRoom.length);
  });

  it('should create a new room', () => {
    const roomName = 'New Room';
    const description = 'Test description';
    const createdRoom: Room = { id: '3', name: roomName, description };

    spyOn(gameConnectionService, 'createRoom').and.callFake(() => {
      return Observable.create((observer: { next: (arg0: Room) => void; complete: () => void; }) => {
        observer.next(createdRoom);
        observer.complete();
      });
    });

    component.room_name.setValue(roomName);
    component.description = description;
    component.createNewRoom();

    expect(gameConnectionService.createRoom).toHaveBeenCalledWith(roomName, description);
    expect(component.createdRoom).toEqual(createdRoom);
    expect(component.selectedValue).toEqual(roomName);
    expect(component.roomArray).toContain(createdRoom);
  });

  it('should join a room', () => {
    const selectedRoom: Room = { id: '4', name: 'Selected Room', description: 'Test selected room' };
    const nickname = 'Test Nickname';
    const roomId = '4';

    spyOn(gameConnectionService, 'joinRoom').and.returnValue(of());

    component.selectedValue = selectedRoom.name;
    component.nickname.setValue(nickname);
    component.joinRoom();

    expect(gameConnectionService.joinRoom).toHaveBeenCalledWith(roomId, nickname);
    expect(component.router.navigate).toHaveBeenCalledWith(['/room/' + roomId]);
  });

  it('should find room id with name', () => {
    const rooms: Room[] = [
      { id: '5', name: 'Room 5', description: 'Test room 5' },
      { id: '6', name: 'Room 6', description: 'Test room 6' },
    ];
    const selectedValue = 'Room 6';

    const roomId = component.findRoomIdWithName(selectedValue, rooms);

    expect(roomId).toEqual('6');
  });
});
