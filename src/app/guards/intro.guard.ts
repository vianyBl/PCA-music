import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable({ providedIn: 'root' })
export class IntroGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const visto = await this.storage.get('introVisto');
    if (visto === true) {
      return true;
    } else {
      this.router.navigate(['/intro']);
      return false;
    }
  }
}
