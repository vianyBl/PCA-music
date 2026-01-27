import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  // 🔁 Ruta inicial
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 👋 Intro (solo si está logueada)
  {
    path: 'intro',
    loadComponent: () =>
      import('./intro/intro.page').then(m => m.IntroPage),
    canActivate: [AuthGuard]
  },

  // 🔐 Home (solo si está logueada)
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuard]
  },

  // 🔐 Menu (solo si está logueada)
  {
    path: 'menu',
    loadComponent: () =>
      import('./menu/menu.page').then(m => m.MenuPage),
    canActivate: [AuthGuard]
  },

  // 🔓 Login (acceso libre)
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage),
  },

  // 📝 Register (acceso libre)
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then(m => m.RegisterPage),
  },

  // ❌ Fallback (SIEMPRE AL FINAL)
  { path: '**', redirectTo: 'login' }
];
