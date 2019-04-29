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
  canciones = ['assets/musica/1.mp3', 'assets/musica/3.mp3', 'assets/musica/4.mp3'];
  emisoras = [];
  flag: boolean;
  divPintados: Array < any > ;
  volumen: number;
  volume = 0.20;
  index = 0;

  sound;



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
      'play': function () {
        that.play(that.index);
      },
      'pausa': function () {
        that.play(that.index);
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
    if (this.sound) {
      this.sound.volume(this.volume, this.sound.id);
      this.volume = this.volume + 0.2;
    }
    this.volumen++
    this.checkClases(true);
    this.ref.detectChanges();
  }
  bajarVolumen() {
    if (this.volumen > 0) {
      if (this.sound) {
        this.sound.volume(this.volume, this.sound.id);
        this.volume = this.volume - 0.2;
      }
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
//REPRODUCTOR
  createHowl(index) {

    if(index || index === 0) {
      this.index = index;
    }

    this.sound = new Howl({
      src: [this.canciones[this.index]]
    });
    this.sound.on('end', () => {
      this.skip('next');
    })
    this.sound.play();
  }

  skip(direction) {

      // Pasar a siguiente cancion
      let index = 0;
      if (direction === 'prev') {
        index = this.index - 1;
        if (index < 0) {
          index = this.canciones.length - 1;
        }
      } else {
        index = this.index + 1;
        if (index >= this.canciones.length) {
          index = 0;
        }
      }

      this.skipTo(index);
  }

  skipTo(index) {
    this.sound.stop();
    this.createHowl(index);
  }

  play(index) {

    if(!this.sound) {
      this.createHowl(index);
    } else {
      this.sound.play();
    }
    this.ref.detectChanges();
  }

  pause(index) {
    this.sound.pause();
  }

  siguiente() {
    this.sound.skip('next');
  }

  anterior() {
    this.sound.skip('prev');
  }

}
