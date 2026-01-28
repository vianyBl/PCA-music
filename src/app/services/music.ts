import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Music {
  private urlServer = "https://music.fly.dev";

  constructor() {}

  // Método para obtener canciones
  getTracks() {
    return fetch(`${this.urlServer}/tracks`)
      .then(response => response.json())
      .catch(error => {
        console.error("Error al obtener tracks:", error);
        throw error;
      });
  }

  // Método para obtener álbumes
  getAlbums() {
    return fetch(`${this.urlServer}/albums`)
      .then(response => response.json())
      .catch(error => {
        console.error("Error al obtener albums:", error);
        throw error;
      });
  }
}