import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainPageComponent } from "./pages/main/main.component";
import { JumboTitleComponent } from "./components/jumbo-title/jumbo-title.component";
import { AuthorsPageComponent } from "./pages/authors/authors.component";
import { WorksCitedPageComponent } from "./pages/workcited/workscited.component";
import { ScrollerComponent } from "./components/scroller/scroller.component";
import { TippyDirective } from "./directives/tippy.directive";
import { LuminousLightboxDirective } from "./directives/luminous-lightbox.directive";
import { DriftzoomDirective } from "./directives/driftzoom.directive";
import { SharedModule } from "./modules/shared/shared.module";
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    JumboTitleComponent,
    AuthorsPageComponent,
    WorksCitedPageComponent,
    ScrollerComponent,
    TippyDirective,
    LuminousLightboxDirective,
    DriftzoomDirective
  ],
  imports: [BrowserModule, SharedModule, AppRoutingModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    }
  ],
})
export class AppModule {}
