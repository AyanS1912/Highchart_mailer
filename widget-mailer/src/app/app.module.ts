import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { WidgetsComponent } from './widgets/widgets.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
