import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Music } from '../services/music';
import { StorageService } from '../storage.service';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { ThemeService, AppTheme } from '../services/theme.service';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import {
  colorPaletteOutline,
  logOutOutline,
  notificationsOutline,
  searchOutline,
  musicalNotesOutline,
  playCircleOutline,
  refreshOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  topTracks: any[] = [];
  topAlbums: any[] = [];
  isLoading = true;
  greeting = '';

  constructor(
    private storageService: StorageService,
    private router: Router,
    private auth: Auth,
    private music: Music,
    private themeService: ThemeService
  ) {
    register();
    addIcons({
      colorPaletteOutline,
      logOutOutline,
      notificationsOutline,
      searchOutline,
      musicalNotesOutline,
      playCircleOutline,
      refreshOutline
    });
  }

  async ngOnInit() {
    this.setGreeting();
    this.loadData();
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting = 'Buenos días';
    else if (hour < 18) this.greeting = 'Buenas tardes';
    else this.greeting = 'Buenas noches';
  }

  async loadData() {
    this.isLoading = true;
    try {
      const [tracks, albums] = await Promise.all([
        this.music.getTracks(),
        this.music.getAlbums()
      ]);
      this.topTracks = tracks;
      this.topAlbums = albums;
    } catch (e) {
      console.error('Error loading home data:', e);
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getCurrentTheme(): AppTheme {
    return this.themeService.getCurrentTheme();
  }

  async irAIntro() {
    await this.storageService.remove('introVisto');
    this.router.navigate(['/intro']);
  }
}