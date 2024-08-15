import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, AppComponent],  // IMPORTAR AppComponent aquí
  bootstrap: [AppComponent],
})
export class AppModule {}
