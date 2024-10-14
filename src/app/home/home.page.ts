import {Component} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {camera, cellular, clipboard, cog, folder, globe, locate, map, notifications, shareSocial} from "ionicons/icons";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel],
})
export class HomePage {
  constructor() {
    addIcons({camera, globe, clipboard, cog, folder, notifications, cellular, shareSocial, locate, map})
  }
}
