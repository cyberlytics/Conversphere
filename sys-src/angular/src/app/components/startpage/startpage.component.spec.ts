import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting }
    from '@angular/common/http/testing';
import { StartpageComponent } from './startpage.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Room } from 'src/app/interfaces/rooms';

const mockRoomArray: Room[] = [{ id: 'room1', name: 'Room 1', description: 'Test Room 1' },
{ id: 'room2', name: 'Room 2', description: 'Test Room 2' }];
const mockNickname = 'John Doe';
const mockRoomName = 'Room 1';
const mockoneRoom = { id: 'room1', name: 'Room 1', description: 'Test Room 1' };

describe('StartpageComponent', () => {
  let component: StartpageComponent;
  let fixture: ComponentFixture<StartpageComponent>;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ StartpageComponent, NoopAnimationsModule ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),

        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartpageComponent);
    component = fixture.componentInstance;
    component.nickname = mockNickname ;
    component.roomName = mockRoomName; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rooms after initialisation', () => {
    const ctrl = TestBed.inject(HttpTestingController);
    const req = ctrl.expectOne('http://localhost:8080/api/rooms');

    req.flush(mockRoomArray);

    expect(component.roomArray).toEqual(mockRoomArray);
    ctrl.verify();
  });

  it('should call joinRoom and navigate to the selected room', () => {
    const ctrl = TestBed.inject(HttpTestingController);
    const req1 = ctrl.expectOne('http://localhost:8080/api/rooms');
  
    req1.flush(mockRoomArray);

    const navigateSpy = spyOn(component.router, 'navigate');
    component.joinRoom();
    const req2 = ctrl.expectOne('http://localhost:8080/api/joinRoom');
    req2.flush(mockoneRoom);
    
    expect(component.joinedRoom).toEqual(mockoneRoom);
    expect(navigateSpy).toHaveBeenCalledWith(['/room/' + mockoneRoom.id]);
    ctrl.verify();
  });



  // it('should call createRoom and add the created room to the roomArray', () => {
  //   const createdRoom: Room = { id: 'room123', name: 'Room 1', description: 'Test Room' };
  //   spyOn(gameConnectionService, 'createRoom').and.returnValue(of(createdRoom));

  //   component.room_name.setValue('Room 1');
  //   component.description = 'Test Room';
  //   component.createNewRoom();

  //   expect(gameConnectionService.createRoom).toHaveBeenCalledWith('Room 1', 'Test Room');
  //   expect(component.createdRoom).toEqual(createdRoom);
  //   expect(component.selectedValue).toEqual('Room 1');
  //   expect(component.roomArray).toContain(createdRoom);
  // });

  // it('should call getRooms and populate the roomArray', () => {
  //   const roomArray: Room[] = [
  //     { id: 'room1', name: 'Room 1', description: 'Test Room 1' },
  //     { id: 'room2', name: 'Room 2', description: 'Test Room 2' },
  //   ];
  //   spyOn(gameConnectionService, 'getRooms').and.returnValue(of(roomArray));

  //   component.getRooms();

  //   expect(gameConnectionService.getRooms).toHaveBeenCalled();
  //   expect(component.roomArray).toEqual(roomArray);
  // });
});
