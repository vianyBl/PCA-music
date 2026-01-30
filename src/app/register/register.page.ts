import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonInput,
  IonCard,
  ToastController
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  calendarOutline,
  arrowBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonButton,
    IonIcon,
    IonItem,
    IonInput,
    IonCard
  ]
})
export class RegisterPage implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  birthdate: string = '';

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({
      personOutline,
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      calendarOutline,
      arrowBackOutline
    });
  }

  ngOnInit() { }

  togglePasswordVisibility(field: 'password' | 'confirm' = 'password') {
    if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    } else {
      this.showPassword = !this.showPassword;
    }
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      color: color,
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  async register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.birthdate) {
      this.presentToast('Completa todos los campos para continuar', 'warning');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{6,}$/;
    if (!passwordRegex.test(this.password)) {
      this.presentToast('Contraseña débil: añade mayúsculas, números y símbolos.', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden', 'warning');
      return;
    }

    try {
      await this.auth.register(
        this.email,
        this.password,
        { username: this.username, birthdate: this.birthdate }
      );
      this.presentToast('¡Cuenta creada! Ya puedes entrar 🎉', 'success');
      this.router.navigate(['/login']);
    } catch (error) {
      this.presentToast('Hubo un problema al crear tu cuenta', 'danger');
    }
  }
}