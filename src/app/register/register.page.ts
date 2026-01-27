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

  // Toggle visibility
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private toastController: ToastController // 👈 Lo inyectamos aquí
  ) {}

  ngOnInit() {}

  togglePasswordVisibility(field: 'password' | 'confirm' = 'password') {
    if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    } else {
      this.showPassword = !this.showPassword;
    }
  }

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

  // Validación rápida que también se usa para feedback inline
  passwordMeetsRequirements(pw: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{6,}$/;
    return passwordRegex.test(pw);
  }

  async register() {
    // 🔴 Validaciones con Toast
    if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.birthdate) {
      this.presentToast('Completa todos los campos', 'warning');
      return;
    }

    // ✅ Validación de contraseña (mínimo 6, mayúscula, minúscula, número y al menos un carácter especial, sin espacios)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{6,}$/;

    if (!passwordRegex.test(this.password)) {
      this.presentToast('La contraseña debe tener mínimo 6 caracteres, incluir mayúscula, minúscula, número y carácter especial (sin espacios)', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden', 'warning');
      return;
    }

    // Validar si el email ya está registrado
    const registeredEmail = await this.auth['storage'].get('registeredEmail');
    if (registeredEmail && registeredEmail === this.email) {
      this.presentToast('El correo ya está registrado. Inicia sesión o usa otro.', 'danger');
      return;
    }

    try {
      await this.auth.register(
        this.email,
        this.password,
        { username: this.username, birthdate: this.birthdate }
      );
      // ✅ Éxito
      this.presentToast('Registro exitoso 🎉', 'success');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
      this.presentToast('Error al registrar el usuario', 'danger');
    }
  }
}