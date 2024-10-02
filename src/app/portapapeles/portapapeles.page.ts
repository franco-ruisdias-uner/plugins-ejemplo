import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBackButton, IonButton,
  IonButtons, IonCol,
  IonContent, IonGrid,
  IonHeader, IonInput, IonItem, IonRow,
  IonTitle,
  IonToolbar,
  ToastController
} from '@ionic/angular/standalone';
import {Clipboard} from '@capacitor/clipboard';

@Component({
  selector: 'app-portapapeles',
  templateUrl: './portapapeles.page.html',
  styleUrls: ['./portapapeles.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonGrid, IonCol, IonRow, IonButton, IonInput, IonItem]
})
export class PortapapelesPage {

  textAEscribir: string | null = null;

  constructor(private toastCtl: ToastController) {
  }


  async escribirEnPortapapeles() {
    if (this.textAEscribir) {
      await Clipboard.write({
        string: this.textAEscribir,
      });
    }

  }

  async leerDesdeElPortapapeles() {
    const {type, value} = await Clipboard.read();
    console.log(type, value);
    const toast = await this.toastCtl.create({
      color: 'primary',
      message: `Mensaje: ${value}. Tipo del msj: ${type}`,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log("Toast cerrado")
          }
        }
      ]
    })
    await toast.present();
  }

}
