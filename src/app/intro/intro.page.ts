import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

// Importamos tu servicio de Storage
import { StorageService } from '../storage.service';

const THEME_KEY = 'selected-theme';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {

  temas = ['light', 'tema-oscuro', 'tema-rosa', 'tema-azul'];
  selectedTheme: string = 'light';

  constructor(
    private router: Router,
    private storage: StorageService   // 👈 Inyectamos StorageService
  ) { }

  async ngOnInit() {
    // Cargar tema guardado si existe para marcar la previsualización
    const saved = await this.storage.get(THEME_KEY);
    if (saved) {
      this.selectedTheme = saved;
      this.aplicarTema(saved, false);
    }
  }

  // Método para volver al Home y guardar que ya se vio la intro
  async goBack() {
    console.log("Guardando estado y volviendo al home...");

    try {
      // Guardar en Storage que ya vio el intro
      await this.storage.set('introVisto', true);

      // Desenfocar cualquier elemento activo antes de navegar para evitar warnings de aria-hidden
      try { (document.activeElement as HTMLElement)?.blur(); } catch (e) { /* noop */ }
      // Navegar al Home
      this.router.navigateByUrl("/home");
    } catch (error) {
      console.error("Error al guardar en storage:", error);
      // Navegamos de todos modos para no bloquear al usuario
      this.router.navigateByUrl("/home");
    }
  }

  // Aplica y guarda (opcional) el tema elegido por el usuario
  aplicarTema(nombreTema: string, guardar = true) {
    // Limpiamos clases previas (dejamos 'light' como ausencia de clase)
    document.body.classList.remove(...this.temas.slice(1));

    if (nombreTema && nombreTema !== 'light') {
      document.body.classList.add(nombreTema);
    }

    this.selectedTheme = nombreTema || 'light';

    if (guardar) {
      this.storage.set(THEME_KEY, nombreTema);
    }
  }

}