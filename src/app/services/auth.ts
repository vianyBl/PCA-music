import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private storage: StorageService) {}

  // 🔐 LOGIN
  async loginUser(credentials: any): Promise<string> {
    return new Promise(async (accept, reject) => {

      const registeredEmail = await this.storage.get('registeredEmail');
      const registeredPassword = await this.storage.get('registeredPassword');

      if (
        credentials.email === registeredEmail &&
        credentials.password === registeredPassword
      ) {
        await this.storage.set('isLoggedIn', true);
        await this.storage.set('user', credentials.email);

        accept('login correcto');
      } else {
        await this.storage.remove('isLoggedIn');
        await this.storage.remove('user');

        reject('login incorrecto');
      }
    });
  }

  // 📝 REGISTER
  async register(email: string, password: string): Promise<string> {
    return new Promise(async (accept) => {

      await this.storage.set('registeredEmail', email);
      await this.storage.set('registeredPassword', password);
      await this.storage.set('isLoggedIn', true);
      await this.storage.set('user', email);

      accept('registro correcto');
    });
  }

  // 🚪 LOGOUT
  async logout() {
    await this.storage.remove('isLoggedIn');
    await this.storage.remove('user');
  }

  // 🛡️ PARA EL GUARD
  async isLogged(): Promise<boolean> {
    const logged = await this.storage.get('isLoggedIn');
    return logged === true;
  }
}
