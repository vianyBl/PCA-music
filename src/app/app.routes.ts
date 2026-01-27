import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  // 🔁 Ruta inicial
  { path: '', redirectTo: 'intro', pathMatch: 'full' },

  // 👋 Intro (solo si NO está logueada)
  {
    path: 'intro',
    loadComponent: () =>
      import('./intro/intro.page').then(m => m.IntroPage),
    canActivate: [IntroGuard]
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

  // 🔓 Login (solo si NO está logueada)
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage),
  },

  // 📝 Register (solo si NO está logueada)
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then(m => m.RegisterPage),

  },

  // ❌ Fallback (SIEMPRE AL FINAL)
  { path: '**', redirectTo: 'login' }
];
