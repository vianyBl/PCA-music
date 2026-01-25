import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private storage: StorageService) { }

  async loginUser(credentials: any) {
    return new Promise(async (accept, reject) => {
      if (
        credentials.email == "viany@gmail.com" &&
        credentials.password == "Viany1031@"
      ) {
        // Guardar estado de login en storage
        await this.storage.set('isLoggedIn', true);
        accept("login correcto");
      } else {
        // Asegurarse de limpiar el estado si login falla
        await this.storage.remove('isLoggedIn');
        reject("login incorrecto");
      }
    });
  }

  async logout() {
    await this.storage.remove('isLoggedIn');
  }
}
