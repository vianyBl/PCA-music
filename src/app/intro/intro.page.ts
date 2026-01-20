import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

// Importamos tu servicio de Storage
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {

  constructor(
    private router: Router,
    private storage: StorageService   // 👈 Inyectamos StorageService
  ) { }

  ngOnInit() { }

  // Método para volver al Home y guardar que ya se vio la intro
  async goBack() {
    console.log("Guardando estado y volviendo al home...");

    try {
      // Guardar en Storage que ya vio el intro
      await this.storage.set('introVisto', true);

      // Navegar al Home
      this.router.navigateByUrl("/home");
    } catch (error) {
      console.error("Error al guardar en storage:", error);
      // Navegamos de todos modos para no bloquear al usuario
      this.router.navigateByUrl("/home");
    }
  }

}