import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Music } from '../services/music';
import { addIcons } from 'ionicons';
import { playOutline, listOutline, musicalNoteOutline, closeOutline, pauseOutline } from 'ionicons/icons';

@Component({
    selector: 'app-songs-modal',
    templateUrl: './songs-modal.page.html',
    styleUrls: ['./songs-modal.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class SongsModalPage implements OnInit {
    songs: any[] = [];
    artistName: string = '';

    constructor(
        private modalController: ModalController,
        private musicService: Music
    ) {
        addIcons({ playOutline, listOutline, musicalNoteOutline, closeOutline, pauseOutline });
    }

    currentAudio: HTMLAudioElement | null = null;
    currentlyPlayingSong: any = null;

    ngOnInit() { }

    dismiss() {
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
        this.modalController.dismiss();
    }

    playSong(song: any) {
        if (this.currentlyPlayingSong === song) {
            this.pauseSong();
            return;
        }

        if (this.currentAudio) {
            this.currentAudio.pause();
        }

        this.currentlyPlayingSong = song;
        this.currentAudio = new Audio(song.audio);
        this.currentAudio.play();

        this.currentAudio.onended = () => {
            this.currentlyPlayingSong = null;
        };
    }

    pauseSong() {
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
        this.currentlyPlayingSong = null;
    }

    formatDuration(seconds: number): string {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}
