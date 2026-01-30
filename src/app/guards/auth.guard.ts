import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage.service';

// 🔁 Guard que REDIRIGE según estado de login
export const AuthGuard: CanActivateFn = async (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const isLoggedIn = await storage.get('isLoggedIn');
  console.log('AuthGuard: isLoggedIn value is', isLoggedIn);

  // ❌ NO logeada → LOGIN
  if (isLoggedIn !== true) {
    console.log('AuthGuard: Access denied, redirecting to login');
    await router.navigate(['/login']);
    return false;
  }

  // ✅ SÍ logeada → permitir acceso
  console.log('AuthGuard: Access granted');
  return true;
};
