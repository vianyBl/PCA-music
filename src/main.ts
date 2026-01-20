import { enableProdMode, importProvidersFrom } from '@angular/core'; // 1. Importar importProvidersFrom
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// 2. Importar el módulo de almacenamiento de Ionic
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// Es buena práctica incluir la comprobación de producción
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),


    // Inicializa el módulo de almacenamiento globalmente.
    importProvidersFrom(IonicStorageModule.forRoot())
  ],
});