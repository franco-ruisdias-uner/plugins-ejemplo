import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'camara',
    loadComponent: () => import('./camara/camara.page').then(m => m.CamaraPage)
  },
  {
    path: 'navegador',
    loadComponent: () => import('./navegador/navegador.page').then(m => m.NavegadorPage)
  },
  {
    path: 'portapapeles',
    loadComponent: () => import('./portapapeles/portapapeles.page').then( m => m.PortapapelesPage)
  },
  {
    path: 'dispositivo',
    loadComponent: () => import('./dispositivo/dispositivo.page').then( m => m.DispositivoPage)
  },
  {
    path: 'local-notifications',
    loadComponent: () => import('./local-notifications/local-notifications.page').then( m => m.LocalNotificationsPage)
  },
  {
    path: 'redes',
    loadComponent: () => import('./redes/redes.page').then( m => m.RedesPage)
  },
];
