import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { 
  closeOutline, 
  refreshOutline, 
  logOutOutline 
} from 'ionicons/icons';

addIcons({
  'close-outline': closeOutline,
  'refresh-outline': refreshOutline,
  'log-out-outline': logOutOutline
});

register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
