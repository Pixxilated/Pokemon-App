import { ApplicationConfig } from "@angular/core"
import { provideRouter } from '@angular/router'

import { routes } from "./app.routes"
import { provideHttpClient } from "@angular/common/http"

export const appConfig: ApplicationConfig = {
  providers: [
    // tell the angular router that we want to USE this input based approach
    // withComponentInputBinding will create a config object thats passed to
    // provide router as a second argument.
    provideRouter(routes),
    provideHttpClient(),
  ],
}