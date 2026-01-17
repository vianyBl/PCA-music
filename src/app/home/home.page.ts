import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {

  // =========================
  // GÉNEROS MUSICALES
  // =========================
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
  // SISTEMA DE TEMAS
  // =========================
  temas = ['tema-oscuro', 'tema-rosa', 'tema-azul'];
  temaActualIndex = 0;

  // =========================
  // MÉTODOS
  // =========================
  selectGenre(genre: any) {
    this.selectedGenre = genre;
  }

  CambiarTema() {
    document.body.classList.remove(...this.temas);

    this.temaActualIndex =
      (this.temaActualIndex + 1) % this.temas.length;

    document.body.classList.add(this.temas[this.temaActualIndex]);
  }

  constructor() {}
}
