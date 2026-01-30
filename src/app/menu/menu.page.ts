import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { Auth } from '../services/auth';
import { addIcons } from 'ionicons';
import { homeOutline, peopleOutline, settingsOutline, logOutOutline, playCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class MenuPage implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService,
    private auth: Auth
  ) {
    addIcons({ homeOutline, peopleOutline, settingsOutline, logOutOutline, playCircleOutline });
  }

  ngOnInit() {
  }

  async irAIntro() {
    try { (document.activeElement as HTMLElement)?.blur(); } catch (e) { /* noop */ }

    try {
      await this.storageService.remove('introVisto');
    } catch (e) {
      console.warn('No se pudo borrar introVisto del storage', e);
    }

    this.router.navigate(['/intro']);
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }

}
