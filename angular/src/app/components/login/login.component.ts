import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    AuthComponent,
    MatButtonModule
  ],
  providers: [AuthentificationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthentificationService) { }
  email!: string;
  password!: string;

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
}