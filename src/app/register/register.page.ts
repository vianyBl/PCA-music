import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class RegisterPage implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  birthdate: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private toastController: ToastController // 👈 Lo inyectamos aquí
  ) {}

  ngOnInit() {}

  // 👇 Función auxiliar para mostrar mensajes bonitos
  async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  async register() {
    // 🔴 Validaciones con Toast
    if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.birthdate) {
      this.presentToast('Completa todos los campos', 'warning');
      return;
    }

    // ✅ Validación de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{1,6}$/;

    if (!passwordRegex.test(this.password)) {
      this.presentToast('La contraseña debe tener máximo 6 caracteres, incluir una mayúscula, un número y un carácter especial', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden', 'warning');
      return;
    }

    try {
      await this.auth.register(this.email, this.password);
      
      // ✅ Éxito
      this.presentToast('Registro exitoso 🎉', 'success');
      this.router.navigate(['/login']);

    } catch (error) {
      console.error(error);
      this.presentToast('Error al registrar el usuario', 'danger');
    }
  }
}