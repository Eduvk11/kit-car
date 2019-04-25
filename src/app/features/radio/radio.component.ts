import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  Howl,
  Howler
} from 'howler';
declare let annyang;
@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  seleccion = '';
  pantalla = '';

  flag: boolean;
  divPintados: Array < any > ;
  volumen: number;

   sound = new Howl({
    src: ['assets/musica/1.mp3', 'assets/musica/2.mp3', 'assets/musica/3.mp3', 'assets/musica/4.mp3']
  });


  constructor(private ref: ChangeDetectorRef) {
    annyang.setLanguage('es-ES');
    const that = this;

    annyang.addCommands({

      'radio': function () {
        that.hideRadio();
      },
      'auxiliar': function () {
        that.hideUsb();
      },
      'bluetooth': function () {
        that.hideBluetooth();
      },
      'subir volumen': function () {
        that.subirVolumen();
      },
      'bajar volumen': function () {
        that.bajarVolumen();
      },
      'play': function () {
        that.play();
      }
    });
    annyang.start();
  }

  ngOnInit() {
    this.volumen = 0;
    this.divPintados = [false, false, false, false, false];
  }
  //====================MOSTRAR Y OCULTAR EFECTOS=======

  hideRadio() {
    if (this.seleccion === 'radio') {
      this.seleccion = '';
    } else {
      this.seleccion = 'radio';
    }
    this.ref.detectChanges();
  }
  hideUsb() {
    if (this.seleccion === 'auxiliar') {
      this.seleccion = '';
    } else {
      this.seleccion = 'auxiliar';
    }
    this.ref.detectChanges();
  }
  hideBluetooth() {
    if (this.seleccion === 'bluetooth') {
      this.seleccion = '';
    } else {
      this.seleccion = 'bluetooth';
    }
    this.ref.detectChanges();
  }
  //VOLUMEN
  subirVolumen() {
    this.volumen++
    this.checkClases(true);
    this.ref.detectChanges();
  }
  bajarVolumen() {
    if (this.volumen > 0) {
      this.volumen--
      this.checkClases(false);
      this.ref.detectChanges();
    }
  }
  checkClases(flag) {
    if (flag) {
      for (let i = 0; i < this.volumen; i++) {
        this.divPintados[i] = flag
      }
    } else {
      for (let i = 5; i >= this.volumen; i--) {
        this.divPintados[i] = flag;
      }
    }
  }

  play() {
    if (this.seleccion === 'play') {
      this.seleccion = '';
    } else {
      this.seleccion = 'play';
    }
    this.ref.detectChanges();
  }


}
