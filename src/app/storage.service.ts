import { Injectable } from '@angular/core';
// Importamos Storage de la librería de Ionic, NO nuestro propio servicio
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Si ya está inicializado, no hacemos nada
    if (this._storage != null) {
      return;
    }
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Crear / Guardar
  public async set(key: string, value: any) {
    await this.init(); // Asegura que storage esté listo
    return this._storage?.set(key, value);
  }

  // Leer / Obtener
  public async get(key: string) {
    await this.init(); // Asegura que storage esté listo
    return this._storage?.get(key);
  }

  // Eliminar
  public async remove(key: string) {
    await this.init();
    return this._storage?.remove(key);
  }

  // Limpiar todo
  public async clear() {
    await this.init();
    return this._storage?.clear();
  }
}