import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { InfoComponent } from './features/info/info.component';
import { RegistroComponent } from './features/registro/registro.component';
import { HomeComponent } from './features/home/home.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { RadioComponent } from './features/radio/radio.component';
import { TelefonoComponent } from './features/telefono/telefono.component';
import { HttpClientModule} from "@angular/common/http";
import { ApiServicio } from "src/servicios/api.servicio";
import { LoginGuard } from './guards/login.guard';
//import { ReproductorHowlComponent } from './features/reproductor-howl/reproductor-howl.component';
//import { RadioHowlComponent } from './features/radio-howl/radio-howl.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfoComponent,
    RegistroComponent,
    HomeComponent,
    RadioComponent,
    TelefonoComponent,
   // ReproductorHowlComponent,
    //RadioHowlComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
  ],
  providers: [ApiServicio, LoginGuard, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
