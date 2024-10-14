import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, OnDestroy,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  AlertController,
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonFab, IonFabButton, IonFabList,
  IonHeader, IonIcon, IonInput, IonSearchbar,
  IonTitle,
  IonToolbar,
  ToastController
} from '@ionic/angular/standalone';
import {GoogleMap, Marker, Polygon, Polyline} from '@capacitor/google-maps';
import {environment} from "../../environments/environment";
import {Geolocation} from "@capacitor/geolocation";
import {addIcons} from "ionicons";
import {add, search, location, checkmark} from "ionicons/icons";
import {SearchComponent} from "./components/search/search.component";
import {colorGenerator} from "../../utils";
import {MarcadorTemporal, Point} from "../../interfaces";


@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonInput, IonButton, IonSearchbar, IonIcon, SearchComponent, IonFab, IonFabButton, IonFabList]
})
export class GoogleMapsPage implements OnDestroy {


  @ViewChild('map', {read: ElementRef}) mapRef: ElementRef<HTMLElement> | undefined;
  map: GoogleMap | undefined;
  showSearch: boolean = false;
  searchMarkerId: string | undefined = undefined;
  modoPoligono: boolean = false;
  idMarcadoresTemporales: MarcadorTemporal[] = [];

  constructor(private toastCtl: ToastController, private alertCtrl: AlertController) {
    addIcons({search, add, location, checkmark})
  }

  ionViewDidEnter() {
    this.initGoogleMaps();
  }

  async initGoogleMaps() {
    const hasPermission = await this.checkPermissions();
    if (!hasPermission) {
      const toast = await this.toastCtl.create({
        message: 'No tiene permisos suficientes para mostrar el mapa',
        color: 'danger',
        buttons: [{role: 'cancel', text: 'OK'}]
      })
      await toast.present();
      return;
    }
    if (!this.mapRef) {
      const toast = await this.toastCtl.create({
        message: 'Error al cargar el mapa',
        color: 'danger',
        buttons: [{role: 'cancel', text: 'OK'}]
      })
      await toast.present();
      return;
    }
    const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
    const {coords: {latitude, longitude}} = position
    this.map = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleMapsKey,
      config: {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: 13,
      },
    });
    await this.map.enableCurrentLocation(true);

    await this.map.setOnPolylineClickListener(listener => {
      console.log('POLIGONO')
      /*const {polygonId} = listener;
      this.removerItem(polygonId, "POLYGON");*/
    })
    await this.map.setOnMapClickListener(listener => {

      const {latitude, longitude} = listener;
      if (!this.modoPoligono) {
        this.showAlertCreate(latitude, longitude)
      } else if (this.modoPoligono) {
        this.map?.addMarker({
          coordinate: {lat: latitude, lng: longitude},
          iconUrl: 'assets/icon/favicon.png'
        }).then(marker => {
          this.idMarcadoresTemporales.push({id: marker, lng: longitude, lat: latitude});
        })
      }
    });
    await this.map.setOnMarkerClickListener(listener => {
      const {markerId} = listener;
      this.removerItem(markerId, 'MARKER');
    });
  }

  async checkPermissions() {
    const permissions = await Geolocation.checkPermissions();
    return permissions.location === 'granted' && permissions.coarseLocation === 'granted'
  }

  async guardarPoligono() {
    this.togglePolygonMode();
    this.map?.removeMarkers(this.idMarcadoresTemporales.map(marker => marker.id));
    const color = colorGenerator();
    await this.map?.addPolygons([{
      paths: this.idMarcadoresTemporales.map(marker => {
        return {lat: marker.lat, lng: marker.lng};
      }),
      editable: true,
      strokeColor: color,
      fillColor: color,
      fillOpacity: 0.5,
    }]);
    this.idMarcadoresTemporales = [];
  }

  async onNewCoordinates(coords: Point) {
    this.map?.setCamera({
      coordinate: {lat: coords.lat, lng: coords.lng},
      zoom: 18
    });
    this.searchMarkerId = await this.map?.addMarker({
      coordinate: {lat: coords.lat, lng: coords.lng},
    });
  }

  async showAlertCreate(lat: number, long: number) {
    const alert = await this.alertCtrl.create({
      message: 'Qué querés crear?',
      header: 'Nuevo item',
      buttons: [
        {role: 'cancel', text: 'Nada'},
        {
          text: 'Marcador', handler: () => {
            this.map?.addMarker({
              coordinate: {lat: lat, lng: long},
              // iconUrl:'assets/icon/favicon.png'
            });
          }
        },
        {
          text: 'poligono', handler: () => {
            this.togglePolygonMode();
            this.map?.addMarker({
              coordinate: {lat, lng: long},
              iconUrl: 'assets/icon/favicon.png'
            }).then(marker => {
              this.idMarcadoresTemporales.push({id: marker, lng: long, lat: lat});
            })
          }
        }
      ]
    });
    await alert.present()
  }

  async removerItem(id: string, type: 'POLYGON' | 'MARKER') {
    const alert = await this.alertCtrl.create({
      message: `Remover ${type === "POLYGON" ? 'polígono' : 'marcador'}?`,
      buttons: [
        {role: 'cancel', text: 'NO'},
        {
          text: 'SI', handler: () => {
            switch (type) {
              case "MARKER":
                this.map?.removeMarker(id);
                break;
              case "POLYGON":
                this.map?.removePolygons([id]);
            }

          }
        }
      ]
    });
    await alert.present()
  }

  toggleSearchBar() {
    this.showSearch = !this.showSearch;
  }

  togglePolygonMode() {
    this.modoPoligono = !this.modoPoligono;
    console.log(this.modoPoligono)
  }

  ngOnDestroy() {
    this.map?.removeAllMapListeners();
  }
}
