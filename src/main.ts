import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { Platform } from '@ionic/angular';




if (environment.production) {
  enableProdMode();
}
/*
// Comprobamos si estamos trabajando con un dispositivo móvil
if (this.plataforma.is("hybrid")) {
}

// Comprobamos si estamos trabajando con el navegador
if (!this.plataforma.is("hybrid")) {
}

*/
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  // Call the element loader after the platform has been bootstrapped
defineCustomElements(window);