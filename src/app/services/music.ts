import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Music {
  private proxy = "https://api.allorigins.win/get?url=";
  private urlServer = "https://api.deezer.com";

  constructor() { }

  /**
   * Helper para comunicarse con Deezer usando proxies de bypass CORS
   */
  private async deezerFetch(endpoint: string) {
    const fullUrl = `${this.urlServer}${endpoint}`;
    // Probamos diferentes proxies para saltar CORS, en orden de fiabilidad
    const proxies = [
      `https://corsproxy.io/?${encodeURIComponent(fullUrl)}`,
      `https://api.allorigins.win/get?url=${encodeURIComponent(fullUrl)}`,
      `https://thingproxy.freeboard.io/fetch/${fullUrl}`
    ];

    let lastError: any;

    for (const proxyUrl of proxies) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // Aumentamos a 12s

        const response = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const text = await response.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error("Respuesta no es JSON válida");
        }

        // Manejo específico para AllOrigins
        if (data && data.contents) {
          try {
            return JSON.parse(data.contents);
          } catch (e) {
            throw new Error("Contenido de proxy inválido");
          }
        }

        return data;
      } catch (error) {
        lastError = error;
        console.warn(`Intento fallido conproxy: ${proxyUrl}`, error);
        continue;
      }
    }

    throw lastError || new Error("Todos los proxies fallaron");
  }

  /**
   * Obtiene la lista base de artistas desde el archivo JSON local.
   * Este es el "corazón" de tu biblioteca.
   */
  getLocalArtists() {
    return fetch("assets/artistas.json")
      .then(response => response.json())
      .then(data => data.artists)
      .catch(error => {
        console.error("Error al cargar artistas locales:", error);
        throw error;
      });
  }

  /**
   * Obtiene las canciones TOP de un artista usando la API de Deezer.
   * Si se pasa un nombre en lugar de un ID, primero busca al artista.
   */
  async getArtistTracks(query: string | number) {
    try {
      let artistId = query;

      // Si no es un número, es un nombre. Buscamos el ID del artista en Deezer.
      if (isNaN(Number(query))) {
        const searchData = await this.deezerFetch(`/search/artist?q=${encodeURIComponent(query.toString())}&limit=1`);
        if (searchData.data && searchData.data.length > 0) {
          artistId = searchData.data[0].id;
        } else {
          return []; // No se encontró el artista
        }
      }

      // Ahora que tenemos el ID, pedimos sus canciones Top
      const data = await this.deezerFetch(`/artist/${artistId}/top?limit=20`);
      return data.data.map((t: any) => ({
        id: t.id,
        name: t.title,
        album_name: t.album?.title || 'Single',
        image: t.album?.cover_medium,
        audio: t.preview, // Fragmento de 30 seg
        duration: t.duration
      }));
    } catch (error) {
      console.error(`Error Deezer tracks for ${query}:`, error);
      return [];
    }
  }

  /**
   * Busca artistas por nombre en Deezer
   */
  async searchArtists(query: string) {
    try {
      const data = await this.deezerFetch(`/search/artist?q=${encodeURIComponent(query)}&limit=10`);
      return data.data.map((a: any) => ({
        id: a.id,
        name: a.name,
        image: a.picture_medium,
        genre: 'Deezer Artist',
        pais: 'Global'
      }));
    } catch (error) {
      console.error("Error al buscar artistas en Deezer:", error);
      return [];
    }
  }

  /**
   * Métodos para compatibilidad con Home (Charts de Deezer)
   */
  async getTracks() {
    try {
      const data = await this.deezerFetch("/chart/0/tracks?limit=10");
      return data.data;
    } catch (e) { return []; }
  }

  async getAlbums() {
    try {
      const data = await this.deezerFetch("/chart/0/albums?limit=10");
      return data.data;
    } catch (e) { return []; }
  }
}