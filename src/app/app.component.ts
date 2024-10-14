import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
  }
}
