import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonInput,
  IonCard,
  IonCheckbox,
  IonLabel
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, eyeOutline, eyeOffOutline, mailOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonButton,
    IonIcon,
    IonItem,
    IonInput,
    IonCard,
    IonCheckbox,
    IonLabel
  ]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showPassword = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    addIcons({
      personOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      mailOutline
    });

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  async ngOnInit() {
    const logged = await this.authService.isLogged();
    if (logged) {
      this.router.navigateByUrl('/menu/home');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async loginUser(credentials: any) {
    this.errorMessage = '';
    try {
      await this.authService.loginUser(credentials);
      this.router.navigateByUrl('/intro');
    } catch (err) {
      const registeredEmail = await this.authService.getRegisteredEmail();
      if (!registeredEmail) {
        this.errorMessage = 'Usuario no registrado. Por favor crea una cuenta.';
      } else {
        this.errorMessage = 'Credenciales incorrectas.';
      }
    }
  }
}