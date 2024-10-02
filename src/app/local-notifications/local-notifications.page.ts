import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  AlertController,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {
  ActionPerformed,
  LocalNotification,
  LocalNotifications,
  LocalNotificationSchema
} from '@capacitor/local-notifications'

@Component({
  selector: 'app-local-notifications',
  templateUrl: './local-notifications.page.html',
  styleUrls: ['./local-notifications.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton]
})
export class LocalNotificationsPage implements OnInit {

  constructor(private alertController: AlertController) {
  }

  ngOnInit() {
    this.initNotifications();
  }

  async initNotifications() {
    const hasPermissions = await LocalNotifications.checkPermissions();
    if (hasPermissions.display !== 'granted') {
      await LocalNotifications.requestPermissions();
    }

    await LocalNotifications.addListener("localNotificationReceived", (notification: LocalNotificationSchema) => {
      this.mostrarAlerta('Nueva notificación!', JSON.stringify(notification.extra));
    })

    await LocalNotifications.addListener("localNotificationActionPerformed", (notification: ActionPerformed) => {
      this.mostrarAlerta('Acción en la notificación!', JSON.stringify(notification.inputValue));
    })

    await LocalNotifications.registerActionTypes({
      types: [
        {
          id: 'ID_ACCION',
          actions: [
            {
              id: 'CANCELAR',
              title: 'Cerrar',
              destructive: true,
            },
            {
              id: 'responder',
              title: 'Responder',
              input: true
            },
            {
              id: 'abrir',
              title: 'Abrir',
            }
          ]
        }
      ]
    });
  }

  async notificacionSimple() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Una notificacion',
          body: 'Es el cuerpo de la notificacion',
          id: 1,
          extra: {
            data: 'Informacion extra para el handler'
          },
        }
      ]
    });
  }

  async notificacionAvanzada() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Una notificacion avanzada',
          body: 'Es el cuerpo de la notificacion avanzada',
          id: 1,
          extra: {
            data: 'Informacion extra para el handler'
          },
          actionTypeId: 'ID_ACCION',
          attachments: [
            {
              id: 'ID_ADJUNTO',
              url: 'res://public/assets/emojis.png',
            }
          ],
          schedule: {at: new Date(Date.now() + 1000 * 3)} //En 3 segundos
        }
      ]
    });
    //ATTACHMENTS SOLO FUNCIONA EN iOS por ahora
  }

  async mostrarAlerta(header: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        }
      ]
    })
    alert.present();
  }
}
