import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { UsernameComponent } from '../username/username.component';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';

//imports für List with single selection
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

//imports für Select with form field
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';


interface Room {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [CommonModule, 
    MatButtonModule, 
    MatIconModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
     MatDialogModule, 
     MatFormFieldModule,
     MatListModule, 
     NgFor,FormsModule, MatSelectModule, MatInputModule],

  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss'],
})


export class StartpageComponent {

  //List with single selection
  typesOfShoes: string[] = ["Raum1", "Raum2" , "Raum3", "Raum4"];


// Select with form field
  selectedValue: string | undefined;
  selectedCar: string | undefined;

  rooms: Room[] = [
    {value: '', viewValue: ''},
    {value: 'Room', viewValue: 'Room'},
    {value: 'Room-1', viewValue: 'Room-1'},
    {value: 'Room-2', viewValue: 'Room-2'},
  ];


  nickname?: string;
  opened: unknown;
  
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(UsernameComponent, );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nickname = result;
    });
  }
}
