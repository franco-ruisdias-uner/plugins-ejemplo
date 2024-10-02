import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput,
  IonItem,
  IonTitle,
  IonToolbar, ToastController
} from '@ionic/angular/standalone';
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.page.html',
  styleUrls: ['./navegador.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonItem, IonInput, IonButton]
})
export class NavegadorPage implements OnDestroy {

  url: string | null = null

  constructor(private toastController: ToastController) {
  }

  async openBrowser() {
    if (!this.url) {
      await this.toastController.create({
        color: 'danger',
        message: 'La url debe existir'
      });
      return;
    }
    await Browser.open({
      url: this.url,
    });

    Browser.addListener("browserPageLoaded", () => {
      console.log("Pagina cargada")
    });

    Browser.addListener("browserFinished", () => {
      console.log("Navegador cerrado");
    });
  }

  ngOnDestroy() {
    Browser.removeAllListeners();
  }
}
