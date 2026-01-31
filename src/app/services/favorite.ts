import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private storageKey = 'favorite_tracks';
  private favorites: any[] = [];

  constructor() {
    this.loadFavorites();
  }

  /** Cargar favoritos desde LocalStorage */
  private loadFavorites() {
    const data = localStorage.getItem(this.storageKey);
    this.favorites = data ? JSON.parse(data) : [];
  }

  /** Guardar favoritos en LocalStorage */
  private saveFavorites() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }

  /** Obtener todos los favoritos */
  getFavorites() {
    return this.favorites;
  }

  /** Verificar si una canción es favorita */
  isFavorite(trackId: number | string): boolean {
    return this.favorites.some(track => track.id === trackId);
  }

  /** Agregar o quitar favorito */
  toggleFavorite(track: any) {
    if (this.isFavorite(track.id)) {
      // Quitar de favoritos
      this.favorites = this.favorites.filter(t => t.id !== track.id);
    } else {
      // Agregar a favoritos
      this.favorites.push({
        id: track.id,
        title: track.title,
        artist: track.artist?.name,
        cover: track.album?.cover_medium,
      });
    }

    this.saveFavorites();
  }

  /** Limpiar todos los favoritos (opcional) */
  clearFavorites() {
    this.favorites = [];
    this.saveFavorites();
  }
}
