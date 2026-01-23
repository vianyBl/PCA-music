import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable({ providedIn: 'root' })
export class IntroRedirectGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const visto = await this.storage.get('introVisto');
    // Si ya vio la intro -> ir a Home, si no -> ir a Intro
    return visto === true ? this.router.createUrlTree(['/home']) : this.router.createUrlTree(['/intro']);
  }
}
