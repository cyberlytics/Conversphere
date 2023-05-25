import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-username',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,],
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})



export class UsernameComponent {

  constructor(
    public dialogRef: MatDialogRef<UsernameComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
    
  NicknameFormControl = new FormControl('', [Validators.required]);
  closedialoge(){
    console.log(this.NicknameFormControl.value);
    this.dialogRef.close(this.NicknameFormControl.value);
    
  }
}

