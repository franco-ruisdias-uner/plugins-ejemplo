import {Component, OnInit, Signal, signal, WritableSignal} from '@angular/core';
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
import {Network} from "@capacitor/network";

@Component({
  selector: 'app-redes',
  templateUrl: './redes.page.html',
  styleUrls: ['./redes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonList, IonItem, IonLabel]
})
export class RedesPage implements OnInit {

  estadoInicial: WritableSignal<string | undefined> = signal(undefined)
  estadoActual: WritableSignal<string | undefined> = signal(undefined)

  constructor() {
  }

  ngOnInit() {
    this.initNetworkPlugin();
  }

  async initNetworkPlugin(): Promise<void> {
    const status = await Network.getStatus();
    this.estadoInicial.set(`${status.connectionType}, ${status.connected ? 'conectado' : 'no conectado'}`)

    await Network.addListener("networkStatusChange", (currentStatus) => {
      this.estadoActual.set(`${currentStatus.connectionType}, ${currentStatus.connected ? 'conectado' : 'no conectado'}`)
    })
  }

}
