import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar,
  IonBackButton,
  IonButtons, IonCol,
  IonContent, IonFab, IonFabButton, IonFabList, IonGrid,
  IonHeader, IonIcon, IonImg, IonRow, IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {add, camera, image} from "ionicons/icons";
import {Camera, CameraResultType} from "@capacitor/camera";


@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonAvatar, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon, IonFabList, IonImg, IonThumbnail, NgOptimizedImage]
})
export class CamaraPage implements OnInit {

  images: string[] = []

  constructor() {
    addIcons({add, camera, image})
  }

  ngOnInit() {
  }

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        // allowEditing: true,
        resultType: CameraResultType.Uri
      });
      if (image?.webPath) {
        this.images.push(image.webPath)
      }
      console.log(this.images)
      // console.log(image)
    } catch (e) {
      console.log(e)
    }
  }

  async openCameraRoll() {
    try {
      const images = await Camera.pickImages({
        quality: 100,
        limit: 10,
      });
      console.log(images)
      images.photos.map(photo => this.images.push(photo.webPath));
    } catch (e) {
      console.log(e)
    }

  }

}
