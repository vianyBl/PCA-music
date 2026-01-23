import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';

export const routes: Routes = [
  // Ruta raíz: redirige a 'home'. El guard de 'home' decidirá si enviar a 'intro'.
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then(m => m.IntroPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [IntroGuard]
  },
  // Fallback
  { path: '**', redirectTo: 'intro' }
];
