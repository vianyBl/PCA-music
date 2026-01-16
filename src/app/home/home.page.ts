import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ CommonModule, IonHeader, IonToolbar, IonTitle, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})

export class HomePage {
  genres = [
    {
      title: "música clásica",
      img: "assets/musica.jpg",
      description: "Sumérgete en la elegancia y belleza de la música clásica, con composiciones inmortales de grandes maestros como Mozart, Beethoven y Bach."
    },
    {
      title: "música moderna",
      img: "assets/musica-moderna.jpg",
      description: "Explora los géneros musicales contemporáneos y las tendencias actuales del mercado musical."
    },
    {
      title: "música electrónica",
      img: "assets/musica-electronica.jpeg",
      description: "Descubre el mundo de la música electrónica con artistas innovadores y sonidos futuristas."
    },
    {
      title: "música pop - Morat",
      img: "assets/musica-pop.avif",
      description: "Cuando el sol se pone y la noche llega, Morat trae melodías que tocan el alma. 'Besos en Guerra', 'Señorita', son historias de amor que nos hacen sentir. La banda que entiende nuestro corazón, que canta nuestros sueños."
    },
    {
      title: "música salsa",
      img: "assets/musica-salsa.webp",
      description: "¡Baila al ritmo de la salsa! Siente la pasión, el ritmo y la energía de este icónico género latino que conquista pistas de baile en todo el mundo."
    }
  ];

  constructor() {}
}
