import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage.service';

// Guard para rutas standalone (Angular 15+)
export const AuthGuard: CanActivateFn = async (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const logged = await storage.get('isLoggedIn');
  if (logged) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};