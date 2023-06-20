import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsernameComponent } from '../username/username.component';


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
    FormsModule,
    MatDialogModule, 
    MatFormFieldModule,
    MatListModule, 
    NgFor,FormsModule, 
    MatSelectModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],

  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss'],
})


export class StartpageComponent {
  
  imagePath = 'assets/chatIcon.png';
  //List with single selection
  typesOfShoes: string[] = ["Raum1", "Raum2" , "Raum3", "Raum4"];
  rooms: Room[] = [
      {value: '', viewValue: ''},
      {value: 'Room', viewValue: 'Room'},
      {value: 'Room-1', viewValue: 'Room-1'},
      {value: 'Room-2', viewValue: 'Room-2'},
    ];

  // Select with form field
  selectedValue: string | undefined;
  nicknameString!: string | null;
  nickname = new FormControl('', [Validators.required,Validators.required, Validators.pattern(/^\S*$/), Validators.minLength(3)]);
  opened: unknown;
  
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, api-Service: ApiService) {

  }

  // Open Info Dialog for chattrules
  openDialog(): void {
    this.nicknameString = this.nickname.value;
    const dialogRef = this.dialog.open(UsernameComponent, {
      width: '60vw',
      data: {nickname: this.nicknameString }
    });
    dialogRef.afterClosed().subscribe( () => {
      console.log('The dialog was closed');
    });
  }
// Copy Link
  linkToCopy = 'http://localhost:3000/start';

  // Snackbar for Copy Link
  copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = this.linkToCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  
    this.snackBar.open('Link wurde in die Zwischenablage kopiert', 'Schließen', {
      duration: 4000,
    });
  }
}