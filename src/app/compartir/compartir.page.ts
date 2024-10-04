import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  AlertController,
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonGrid,
  IonHeader, IonItem,
  IonList, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Share} from "@capacitor/share";
import {Camera} from "@capacitor/camera";

@Component({
  selector: 'app-compartir',
  templateUrl: './compartir.page.html',
  styleUrls: ['./compartir.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonList, IonItem, IonButton, IonRow, IonGrid]
})
export class CompartirPage implements OnInit {

  puedeCompartir: boolean = true;

  constructor(private alertCtl: AlertController) {
  }

  ngOnInit() {
    this.initSharePlugin();
  }

  async initSharePlugin() {
    this.puedeCompartir = (await Share.canShare()).value;
    if (!this.puedeCompartir) {
      const alert = await this.alertCtl.create({
        header: 'Error!',
        message: 'No podes usar la API para compartir.',
        buttons: [
          {
            role: 'cancel',
            text: 'OK'
          }
        ]
      })
      await alert.present();
    }
  }

  async basicShare() {
    if (!this.puedeCompartir) {
      return;
    }

    await Share.share({
      text: 'Texto a compartir!',
      title: 'Es un titulo',
      dialogTitle: 'Titulo solo soportado en Android'
    })
  }

  async compartirImagenes() {
    if (!this.puedeCompartir) {
      return;
    }
    const {photos} = await Camera.pickImages({
      limit: 3
    });
    await Share.share({
      files: photos.map(photo => photo.path!),
    });
  }
}
