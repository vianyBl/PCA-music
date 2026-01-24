import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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

  // ✅ Mensajes de validación
  validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "email", message: "Email inválido" }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria" },
      { type: "minlength", message: "La contraseña debe tener mínimo 8 caracteres" },
      { type: "patternUpper", message: "Debe contener al menos una letra mayúscula" },
      { type: "patternLower", message: "Debe contener al menos una letra minúscula" },
      { type: "patternNumber", message: "Debe contener al menos un número" },
      { type: "patternSpecial", message: "Debe contener al menos un carácter especial (!@#$%^&*)" }
    ]
  };

  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          // Validadores personalizados con regex
          Validators.pattern(/^(?=.*[A-Z]).+$/), // al menos una mayúscula
          Validators.pattern(/^(?=.*[a-z]).+$/), // al menos una minúscula
          Validators.pattern(/^(?=.*[0-9]).+$/), // al menos un número
          Validators.pattern(/^(?=.*[!@#$%^&*]).+$/) // al menos un carácter especial
        ])
      )
    });
  }

  ngOnInit() { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  loginUser(credentials: any){
    console.log(credentials)
  }












}