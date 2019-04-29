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
        that.play();
      },
      'pausa': function () {
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

  createHowl() {
    let index = 0;
    this.sound = new Howl({
      src: this.canciones[index]
    });
    this.sound.on('end', () => {
      if (index < this.canciones.length) {
        index = index + 1;
      }

      this.sound._src = this.canciones[index];
      this.sound.play();
    })
  }

  play() {
    if (!this.sound) {
      this.createHowl()
    }
    if (this.sound.playing()) {
      this.sound.pause();
      this.seleccion = '';
    } else {
      this.sound.play();
      this.seleccion = 'play';
    }
    // if (this.seleccion === 'play') {
    //   this.sound.pause()
    //   this.seleccion = '';
    // } else {
    //   this.sound.play()
    //   this.seleccion = 'play';
    // }
    this.ref.detectChanges();
  }
  siguiente() {

    this.sound.skip('next');
  }
  anterior() {
    this.sound.skip('prev');
  }
  playRadio() {

      var elms = ['station0', 'title0', 'live0', 'playing0', 'station1', 'title1', 'live1', 'playing1', 'station2', 'title2', 'live2', 'playing2', 'station3', 'title3', 'live3', 'playing3', 'station4', 'title4', 'live4', 'playing4'];
      elms.forEach(function (elm) {
        window[elm] = document.getElementById(elm);
      });

      /**
       * Radio class containing the state of our stations.
       * Includes all methods for playing, stopping, etc.
       * @param {Array} stations Array of objects with station details ({title, src, howl, ...}).
       */
      var Radio = function (stations) {
        var self = this;

        self.stations = stations;
        self.index = 0;
      Radio.prototype = {
        /**
         * Play a station with a specific index.
         * @param  {Number} index Index in the array of stations.
         */
        play: function (index) {
          var self = this;
          var sound;

          index = typeof index === 'number' ? index : self.index;
          var data = self.stations[index];

          // If we already loaded this track, use the current one.
          // Otherwise, setup and load a new Howl.
          if (data.howl) {
            sound = data.howl;
          } else {
            sound = data.howl = new Howl({
              src: data.src,
              html5: true, // A live stream can only be played through HTML5 Audio.
              format: ['mp3', 'aac']
            });
          }

          // Begin playing the sound.
          sound.play();

          // Toggle the display.
          self.toggleStationDisplay(index, true);

          // Keep track of the index we are currently playing.
          self.index = index;
        },

        /**
         * Stop a station's live stream.
         */
        stop: function () {
          var self = this;

          // Get the Howl we want to manipulate.
          var sound = self.stations[self.index].howl;

          // Toggle the display.
          self.toggleStationDisplay(self.index, false);

          // Stop the sound.
          if (sound) {
            sound.unload();
          }
        },

        /**
         * Toggle the display of a station to off/on.
         * @param  {Number} index Index of the station to toggle.
         * @param  {Boolean} state true is on and false is off.
         */
        toggleStationDisplay: function (index, state) {
          var self = this;

          // Highlight/un-highlight the row.
          window['station' + index].style.backgroundColor = state ? 'rgba(255, 255, 255, 0.33)' : '';

          // Show/hide the "live" marker.
          window['live' + index].style.opacity = state ? 1 : 0;

          // Show/hide the "playing" animation.
          window['playing' + index].style.display = state ? 'block' : 'none';
        }
      };

      // Setup our new radio and pass in the stations.
      var radio = new Radio([{
            freq: '81.4',
            title: "BBC Radio 1",
            src: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_q',
            howl: null
          },
          {
            freq: '89.9',
            title: "Hip Hop Hits",
            src: 'http://tunein4.streamguys1.com/hhbeafree5',
            howl: null
          },
          {
            freq: '98.9',
            title: "CNN",
            src: 'http://tunein.streamguys1.com/cnn',
            howl: null
          },
          {
            freq: '103.3',
            title: "80's Hits",
            src: 'http://tunein4.streamguys1.com/80shtfree1',
            howl: null
          },
          {
            freq: '107.7',
            title: "Today's Hits",
            src: 'http://rfcmedia.streamguys1.com/MusicPulse.mp3',
            howl: null
          }
        ]);
        }

      }
    }
