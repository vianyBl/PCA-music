import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

export type AppTheme = 'light' | 'dark' | 'rose' | 'blue';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'selected-theme';
    private currentTheme: AppTheme = 'dark'; // Dark por defecto para un look musical

    constructor(private storage: StorageService) { }

    async initTheme() {
        const savedTheme = await this.storage.get(this.THEME_KEY) as AppTheme;
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme('dark');
        }
    }

    setTheme(theme: AppTheme) {
        this.currentTheme = theme;
        // Remover todas las clases de tema previas
        document.body.classList.remove('light-theme', 'dark-theme', 'rose-theme', 'blue-theme');
        // Añadir la nueva
        document.body.classList.add(`${theme}-theme`);
        this.storage.set(this.THEME_KEY, theme);
    }

    getCurrentTheme(): AppTheme {
        return this.currentTheme;
    }

    toggleTheme() {
        const themes: AppTheme[] = ['light', 'dark', 'rose', 'blue'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.setTheme(themes[nextIndex]);
    }
}
