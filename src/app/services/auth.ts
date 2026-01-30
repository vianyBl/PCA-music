
import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private storage: StorageService) { }

  // 🔐 LOGIN
  async loginUser(credentials: any): Promise<string> {
    console.log('Auth: loginUser called with', credentials);
    return new Promise(async (accept, reject) => {
      const registeredEmail = await this.storage.get('registeredEmail');
      const registeredPassword = await this.storage.get('registeredPassword');

      console.log('Auth: registeredEmail:', registeredEmail);
      console.log('Auth: registeredPassword:', registeredPassword);

      const providedEmail = credentials.email?.trim().toLowerCase();
      const providedPassword = credentials.password?.trim();

      const storedEmail = registeredEmail?.trim().toLowerCase();
      const storedPassword = registeredPassword?.trim();

      if (
        providedEmail && providedEmail === storedEmail &&
        providedPassword && providedPassword === storedPassword
      ) {
        console.log('Auth: Login success, setting isLoggedIn=true');
        await this.storage.set('isLoggedIn', true);
        await this.storage.set('user', providedEmail);
        accept('login correcto');
      } else {
        console.log('Auth: Login failed - mismatch or missing data');
        console.log(`Auth: Provided: ${providedEmail} / Stored: ${storedEmail}`);
        // No borramos isLoggedIn aquí para evitar cerrar sesiones válidas por error de tipeo, 
        // a menos que sea necesario.
        reject('login incorrecto');
      }
    });
  }

  // 📝 REGISTER
  async register(
    email: string,
    password: string,
    extra?: { username?: string; birthdate?: string }
  ): Promise<string> {
    return new Promise(async (accept) => {
      await this.storage.set('registeredEmail', email);
      await this.storage.set('registeredPassword', password);
      if (extra?.username) {
        await this.storage.set('registeredUsername', extra.username);
      }
      if (extra?.birthdate) {
        await this.storage.set('registeredBirthdate', extra.birthdate);
      }
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

  // 📧 Helper para verificar si existe usuario
  async getRegisteredEmail(): Promise<string> {
    return await this.storage.get('registeredEmail');
  }
}
