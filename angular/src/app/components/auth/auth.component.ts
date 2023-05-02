import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
    ],
  providers: [AuthentificationService],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email!: string;
  password!: string;
  hide: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthentificationService) { }
  

  onRegister() {
    this.authService.register(this.email, this.password).subscribe(
      success => {
        console.log('Registrierung erfolgreich!');
      },
      error => {
        console.error('Fehler bei der Registrierung:', error);
      }
    );
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      success => {
        console.log('Anmeldung erfolgreich!');
      },
      error => {
        console.error('Fehler bei der Anmeldung:', error);
      }
    );
  }
}
