import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ThemeService, AppTheme } from '../services/theme.service';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, colorPaletteOutline, musicalNotesOutline } from 'ionicons/icons';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

  slides = [
    {
      img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop',
      title: 'Tu música favorita',
      desc: 'Accede a tus artistas de siempre con la potencia de Deezer.',
      icon: 'musical-notes-outline',
      color: 'primary'
    },
    {
      img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500&auto=format&fit=crop',
      title: 'Personaliza tu Estilo',
      desc: 'Elige el tema que mejor se adapte a tu estado de ánimo.',
      icon: 'color-palette-outline',
      color: 'secondary'
    },
    {
      img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop',
      title: 'Sin Límites',
      desc: 'Disfruta de una experiencia fluida, rápida y moderna.',
      icon: 'arrow-forward-outline',
      color: 'tertiary'
    }
  ];

  constructor(
    private router: Router,
    private storage: StorageService,
    private themeService: ThemeService
  ) {
    register();
    addIcons({ arrowForwardOutline, colorPaletteOutline, musicalNotesOutline });
  }

  ngOnInit() { }

  async finishIntro() {
    await this.storage.set('introVisto', true);
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigateByUrl("menu/home");
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getCurrentTheme(): AppTheme {
    return this.themeService.getCurrentTheme();
  }
}