
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// 2. IMPORTANTE: Importar el servicio de Storage.
import { StorageService } from '../storage.service';

// 3. Importamos Router para la navegación
import { Router } from '@angular/router';

// Definimos la clave para guardar en la base de datos local
const THEME_KEY = 'selected-theme';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  genres = [
    {
      title: 'música clásica',
      img: 'assets/musica.jpg',
      description: 'Sumérgete en la elegancia y belleza de la música clásica, con composiciones inmortales de Mozart, Beethoven y Bach.'
    },
    {
      title: 'música moderna',
      img: 'assets/musica-moderna.jpg',
      description: 'Explora los géneros musicales contemporáneos y las tendencias actuales del mercado musical.'
    },
    {
      title: 'música electrónica',
      img: 'assets/musica-electronica.jpeg',
      description: 'Descubre el mundo de la música electrónica con artistas innovadores y sonidos futuristas.'
    },
    {
      title: 'música pop - Morat',
      img: 'assets/musica-pop.avif',
      description: 'Morat trae melodías que tocan el alma. Historias que nos hacen sentir y cantar.'
    },
    {
      title: 'música salsa',
      img: 'assets/musica-salsa.webp',
      description: '¡Baila al ritmo de la salsa! Energía, pasión y sabor latino.'
    }
  ];

  // Género activo
  selectedGenre = this.genres[0];

  // =========================
  // SISTEMA DE TEMAS CORREGIDO
  // =========================
  temas = ['light', 'tema-oscuro', 'tema-rosa', 'tema-azul'];
  temaActualIndex = 0; // Empieza en 0 (light)

  // Propiedad para saber si la intro ya fue vista
  introYaVista = false;

  // 5. Inyectamos el servicio en el constructor
  constructor(private storageService: StorageService, private router: Router) {}

  // 6. ngOnInit: Se ejecuta al cargar la página
  async ngOnInit() {
    const savedTheme = await this.storageService.get(THEME_KEY);
    await this.simularCargaDatos();

    if (savedTheme) {
      console.log('Tema recuperado del storage:', savedTheme);
      const index = this.temas.indexOf(savedTheme);
      if (index !== -1) {
        this.temaActualIndex = index;
        this.aplicarTema(savedTheme, false);
      }
    }

    // =========================
    // Verificar si ya se vio la intro
    // =========================
    const visto = await this.storageService.get('introVisto');
    this.introYaVista = visto === true;

    if (this.introYaVista) {
      console.log("El usuario ya visitó la intro anteriormente");
      // Aquí puedes decidir si ocultar el botón VER INTRO
      // o redirigir automáticamente al home sin mostrar intro
    }
  }

  // =========================
  // MÉTODOS
  // =========================
  selectGenre(genre: any) {
    this.selectedGenre = genre;
  }

  CambiarTema() {
    this.temaActualIndex = (this.temaActualIndex + 1) % this.temas.length;
    const nuevoTema = this.temas[this.temaActualIndex];
    this.aplicarTema(nuevoTema, true);
  }

  private aplicarTema(nombreTema: string, guardar: boolean) {
    document.body.classList.remove(...this.temas.slice(1));

    if (nombreTema !== 'light') {
      document.body.classList.add(nombreTema);
    }

    if (guardar) {
      console.log('Guardando tema:', nombreTema);
      this.storageService.set(THEME_KEY, nombreTema);
    }
  }

  // =========================
  // FUNCIÓN PARA EL BOTÓN "VER INTRO"
  // =========================
  async irAIntro() {

    try { (document.activeElement as HTMLElement)?.blur(); } catch (e) { /* noop */ }

    // Borramos la clave para permitir ver la intro de nuevo
    try {
      await this.storageService.remove('introVisto');
    } catch (e) {
      console.warn('No se pudo borrar introVisto del storage', e);
    }

    this.router.navigate(['/intro']);
  }

  async simularCargaDatos() {
      const data = await this.obtenerDatosSimulados();
      console.log("Datos simulados cargados:", data);
    }
 obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([" clasica ", "pop", "salsa"])
      }, 3000)
    })
  }
}
