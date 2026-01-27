import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage.service';

// 🔁 Guard que REDIRIGE según estado de login
export const AuthGuard: CanActivateFn = async (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const isLoggedIn = await storage.get('isLoggedIn');

  // ❌ NO logeada → LOGIN
  if (!isLoggedIn) {
    await router.navigate(['/login']);
    return false;
  }

  // ✅ SÍ logeada → INTRO
  await router.navigate(['/intro']);
  return false;
};
