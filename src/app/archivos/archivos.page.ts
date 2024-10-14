import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent, IonGrid,
  IonHeader, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Directory, Encoding, Filesystem} from '@capacitor/filesystem';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.page.html',
  styleUrls: ['./archivos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton, IonGrid, IonRow]
})
export class ArchivosPage implements OnInit {
  private carpeta = 'mi-carpeta'
  private directortio = Directory.Documents

  constructor() {

  }

  ngOnInit() {
    this.initPlugin();
  }

  async initPlugin() {
    const permissions = await Filesystem.checkPermissions();
    if (permissions.publicStorage !== 'granted') {
      await Filesystem.requestPermissions();
    }
  }

  async crearCarpeta() {
    try {
      await Filesystem.readdir({
        path: this.carpeta,
        directory: Directory.Documents
      })
    } catch (e) {
      await Filesystem.mkdir({
        path: this.carpeta,
        directory: this.directortio,
      })
    }


  }

  async crearArchivo() {
    const archivo = await Filesystem.writeFile({
      path: `${this.carpeta}/archivo.txt`,
      data: 'Es un texto',
      directory: this.directortio,
      encoding: Encoding.UTF8,
    });
    console.log(`Archivo creado: ${archivo.uri}`);
  }

  async leerArchivo() {
    const archivo = await Filesystem.readFile({
      path: `${this.carpeta}/archivo.txt`,
      directory: this.directortio,
      encoding: Encoding.UTF8,
    });
    console.log(`Archivo leido: ${archivo.data}`);
  }

  async borrarArchivo() {
    const archivo = await Filesystem.deleteFile({
      path: `${this.carpeta}/archivo.txt`,
      directory: this.directortio,
    });
    console.log(`Archivo borrado: ${archivo}`);
  }

  async leerDesdePath() {
    // Se pueden leer usando el path del archivo. Devuelve un binario (en base64).
    // Generalmente se usa cuando los plugins devuelven las URIs de los archivos, como el de la camara.
    const archivo = await Filesystem.readFile({
      path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt',
    });

    console.log('data:', archivo.data);
  }
}
