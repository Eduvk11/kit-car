import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  debug
} from 'util';

declare let annyang;
@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.scss']
})
export class TelefonoComponent implements OnInit {

  seleccion = '';
  pantalla = '';
  numTel = '';
  contacto = '';
  mensaje: '';
  nombre: '';
  favoritos = [];
  ayuda: '';


  constructor(private ref: ChangeDetectorRef) {
    annyang.setLanguage('es-ES');
    const that = this;

    annyang.addCommands({

      'agenda': function () {
        that.hideAgenda();
      },
      'favoritos': function () {
        that.hideFavoritos();
      },
      'marcar': function () {
        that.hideTeclado();
      },
      'ayuda': function () {
        that.hideAyuda();
        that.btnSos('Llamando a 112');
      },
      'llamar a Alvaro': function () {
        that.llamar('Alvaro'),
        that.mensajeLlamada('Llamando a...');
      },
      'llamar a Irene': function () {
        that.llamar('Irene'),
        that.mensajeLlamada('Llamando a...');
      },
      'llamar a Javi': function () {
        that.llamar('Javi'),
        that.mensajeLlamada('Llamando a...');
      },
      'llamar a Lucho': function () {
        that.llamar('Lucho'),
        that.mensajeLlamada('Llamando a...');
      },
      'llamar a Marco': function () {
        that.llamar('Marco'),
        that.mensajeLlamada('Llamando a...');
      },
      'llamar a Raul': function () {
        that.llamar('Raul'),
        that.mensajeLlamada('Llamando a...');
      },
      'pasar a favoritos a Alvaro': function() {
        that.addFavoritos('Alvaro');
      },
      'pasar a favoritos a Irene': function() {
        that.addFavoritos('Irene');
      },
      'pasar a favoritos a Javi': function() {
        that.addFavoritos('Javi');
      },
      'pasar a favoritos a Lucho': function() {
        that.addFavoritos('Lucho');
      },
      'pasar a favoritos a Marco': function() {
        that.addFavoritos('Marco');
      },
      'pasar a favoritos a Raul': function() {
        that.addFavoritos('Raul');
      },
      'uno': function () {
        that.marcarNum(1);
      },
      'dos': function () {
        that.marcarNum(2);
      },
      'tres': function () {
        that.marcarNum(3);
      },
      'cuatro': function () {
        that.marcarNum(4);
      },
      'cinco': function () {
        that.marcarNum(5);
      },
      'seis': function () {
        that.marcarNum(6);
      },
      'siete': function () {
        that.marcarNum(7);
      },
      'ocho': function () {
        that.marcarNum(8);
      },
      'nueve': function () {
        that.marcarNum(9);
      },
      'cero': function () {
        that.marcarNum(0);
      },
      'borrar': function () {
        that.borrarNum();
      },
      'colgar': function () {
        that.mensajeLlamada('');
        that.llamar('');
      }
    });


    annyang.start();
  }


  ngOnInit() {}
  //======================MOSTRAR Y OCULTAR EFECTOS==============

  hideAgenda() {
    if (this.seleccion === 'agenda') {
      this.seleccion = '';
    } else {
      this.seleccion = 'agenda';
    }
    this.contacto = '';
    this.ref.detectChanges();
  }

  changeScreem(nombre) {
    debugger;
    this.pantalla = nombre;

    this.ref.detectChanges();
  }


  hideFavoritos() {
    if (this.seleccion === 'favoritos') {
      this.seleccion = '';
    } else {
      this.seleccion = 'favoritos';
    }
    this.contacto = '';
    this.ref.detectChanges();
  }


  hideTeclado() {
    if (this.seleccion === 'marcar') {
      this.seleccion = '';
    } else {
      this.seleccion = 'marcar';
    }
    this.numTel = '';
    this.ref.detectChanges();
  }
  hideAyuda() {
    if (this.seleccion === 'ayuda') {
      this.seleccion = '';
    } else {
      this.seleccion = 'ayuda';
    }
    this.ayuda = '';
    this.ref.detectChanges();
  }

  hideLlamar() {
    if (this.seleccion === 'llamar') {
      this.seleccion = '';
    } else {
      this.seleccion = 'llamar';
    }
    this.ref.detectChanges();
  }

  marcarNum(num) {
    if (this.numTel.length < 9) {
      this.numTel = `${this.numTel}${num}`;
    }
    this.ref.detectChanges();
  }

  borrarNum() {
    this.numTel = this.numTel.substring(0, this.numTel.length - 1);
    this.ref.detectChanges();
  }

  llamar(nombre) {
    this.contacto = nombre;
    this.ref.detectChanges();
  }
  mensajeLlamada(mensaje) {
    this.mensaje = mensaje;
    this.ref.detectChanges();
  }
  addFavoritos(nombre) {
    this.favoritos.push(nombre);
    this.ref.detectChanges();
  }
  btnSos(ayuda) {
    this.ayuda = ayuda;
    this.ref.detectChanges();
  }
}
