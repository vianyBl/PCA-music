import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular'; // 1. Importar NavController
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule, ReactiveFormsModule, RouterLink ]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showPassword = false;  
  errorMessage: string = '';

  validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "email", message: "Email inválido" }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria" },
      { type: "minlength", message: "La contraseña debe tener mínimo 6 caracteres" },
      // Nota: Mira la sección de "Observación Importante" abajo sobre estos tipos
      { type: "pattern", message: "La contraseña debe incluir mayúscula, minúscula, número y un carácter especial (sin espacios)" }
    ]
  };

  // 2. Inyectar navCtrl en el constructor
  constructor(
    private formBuilder: FormBuilder, 
    private authService: Auth,
    private navCtrl: NavController 
  ) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        // Regex completo para obligar a cumplir todo (mínimo 6, mayúscula, minúscula, número y carácter especial, sin espacios)
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{6,}$/)
      ]))
    });
  }

  ngOnInit() { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async loginUser(credentials: any) {
    this.errorMessage = '';
    try {
      await this.authService.loginUser(credentials);
      // Redirigir a intro tras login exitoso
      this.navCtrl.navigateRoot('/intro');
    } catch (err) {
      // Mejor feedback: distinguir entre usuario no registrado y contraseña incorrecta
      const registeredEmail = await this.authService['storage'].get('registeredEmail');
      if (!registeredEmail) {
        this.errorMessage = 'Usuario no registrado. Por favor crea una cuenta.';
      } else {
        this.errorMessage = 'Credenciales incorrectas.';
      }
    }
  }
}