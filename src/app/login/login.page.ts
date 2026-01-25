import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular'; // 1. Importar NavController
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule, ReactiveFormsModule ]
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
      { type: "minlength", message: "La contraseña debe tener mínimo 8 caracteres" },
      // Nota: Mira la sección de "Observación Importante" abajo sobre estos tipos
      { type: "pattern", message: "La contraseña no cumple con los requisitos (Mayúscula, minúscula, número y especial)" }
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
        Validators.minLength(8),
        // Regex completo para obligar a cumplir todo
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ]))
    });
  }

  ngOnInit() { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async loginUser(credentials: any) {
    console.log(credentials);
    this.authService.loginUser(credentials).then((res) => {
      this.errorMessage = '';
      // Redirigir a intro tras login exitoso
      this.navCtrl.navigateRoot('/intro');
    }).catch(err => {
      console.log(err);
      this.errorMessage = 'Credenciales incorrectas';
    });
  }
}