import {Component, OnInit} from '@angular/core';
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
import {Device} from "@capacitor/device";

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonList, IonItem, IonLabel]
})
export class DispositivoPage implements OnInit {

  deviceId: string | null = null;
  deviceInfo: string | null = null;
  batteryInfo: string | null = null;
  languageCode: string | null = null;
  languageTag: string | null = null;

  constructor() {
  }

  ngOnInit() {
    this.getId();
    this.getDeviceInfo();
    this.getBatteryInfo();
    this.getLanguageInfo()
  }

  async getId() {
    this.deviceId = (await Device.getId()).identifier;
  }

  async getDeviceInfo() {
    this.deviceInfo = JSON.stringify(await Device.getInfo());
  }

  async getBatteryInfo() {
    this.batteryInfo = JSON.stringify(await Device.getBatteryInfo());
  }

  async getLanguageInfo() {
    this.languageTag = (await Device.getLanguageTag()).value;
    this.languageCode = (await Device.getLanguageCode()).value;
  }
}
