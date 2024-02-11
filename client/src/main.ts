import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/core/components/app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
