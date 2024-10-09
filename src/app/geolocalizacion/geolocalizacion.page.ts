import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader, IonItem, IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {LocalNotifications} from "@capacitor/local-notifications";
import {Geolocation, Position, WatchPositionCallback} from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonList, IonItem, IonLabel]
})
export class GeolocalizacionPage implements OnInit {

  locationInicial: WritableSignal<Position | undefined> = signal(undefined)
  locationActual: WritableSignal<Position | undefined> = signal(undefined)
  hasPermissions: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.initPlugin();
    this.getLocation();
  }

  async initPlugin() {
    let locPermissions = (await Geolocation.checkPermissions()).location;
    let coarseLocPermissions = (await Geolocation.checkPermissions()).coarseLocation;

    if (locPermissions !== 'granted' || coarseLocPermissions !== 'granted') {
      const resp = await Geolocation.requestPermissions({permissions: ['location', 'coarseLocation']});
      locPermissions = resp.location;
      coarseLocPermissions = resp.coarseLocation;
    }
    this.hasPermissions = locPermissions === 'granted' && coarseLocPermissions === 'granted'
  }

  getLocationInicial() {
    if (!this.locationInicial()) {
      return null;
    }
    return this.locationInicial()?.coords
  }

  getLocationActual() {
    if (!this.locationActual()) {
      return null;
    }
    return this.locationActual()?.coords
  }

  async getLocation() {
    if (!this.hasPermissions) {
      return;
    }
    this.locationInicial.set((await Geolocation.getCurrentPosition({enableHighAccuracy: true})));
    await Geolocation.watchPosition({enableHighAccuracy: true}, (position) => {
      if (position) {
        this.locationActual.set(position);
      }
    })
  }
}
