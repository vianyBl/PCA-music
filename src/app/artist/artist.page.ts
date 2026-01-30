import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonSearchbar,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonIcon,
    IonButton,
    IonSpinner,
    ModalController
} from '@ionic/angular/standalone';
import { Music } from '../services/music';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import {
    chevronForwardOutline,
    musicalNoteOutline,
    closeOutline,
    alertCircleOutline,
    searchOutline,
    sparklesOutline
} from 'ionicons/icons';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.page.html',
    styleUrls: ['./artist.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonSearchbar,
        IonList,
        IonItem,
        IonAvatar,
        IonLabel,
        IonIcon,
        IonButton,
        IonSpinner
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArtistPage implements OnInit {
    artists: any[] = [];
    filteredArtists: any[] = [];
    isLoading: boolean = true;
    errorMessage: string = '';

    constructor(
        private musicService: Music,
        private modalController: ModalController
    ) {
        register();
        addIcons({
            chevronForwardOutline,
            musicalNoteOutline,
            closeOutline,
            alertCircleOutline,
            searchOutline,
            sparklesOutline
        });
    }

    ngOnInit() {
        this.loadArtists();
    }

    async loadArtists() {
        this.isLoading = true;
        this.errorMessage = '';

        try {
            this.artists = await this.musicService.getLocalArtists();
            this.filteredArtists = [...this.artists];
        } catch (error) {
            console.error('Error loadArtists:', error);
            this.errorMessage = 'No se pudo cargar la biblioteca de artistas.';
        } finally {
            this.isLoading = false;
        }
    }

    async handleSearch(event: any) {
        const query = event.target.value.toLowerCase();

        if (!query || query.trim() === '') {
            this.filteredArtists = [...this.artists];
            return;
        }

        const localMatches = this.artists.filter(a =>
            a.nombre.toLowerCase().includes(query)
        );

        if (query.length >= 3) {
            try {
                const deezerResults = await this.musicService.searchArtists(query);
                const combined = [...localMatches];
                deezerResults.forEach((da: any) => {
                    if (!combined.some(la => la.nombre.toLowerCase() === da.name.toLowerCase())) {
                        combined.push({
                            id: da.id,
                            nombre: da.name,
                            genero: da.genre,
                            pais: da.pais,
                            image: da.image
                        });
                    }
                });
                this.filteredArtists = combined;
            } catch (e) {
                this.filteredArtists = localMatches;
            }
        } else {
            this.filteredArtists = localMatches;
        }
    }

    async ShowSongsByArtists(artist: any) {
        this.isLoading = true;
        try {
            const songs = await this.musicService.getArtistTracks(artist.id || artist.nombre);
            const modal = await this.modalController.create({
                component: SongsModalPage,
                componentProps: {
                    artist: artist,
                    songs: songs
                }
            });
            return await modal.present();
        } catch (error) {
            console.error("Error al abrir modal de canciones:", error);
            this.errorMessage = "No se pudieron obtener las canciones de este artista.";
        } finally {
            this.isLoading = false;
        }
    }
}
