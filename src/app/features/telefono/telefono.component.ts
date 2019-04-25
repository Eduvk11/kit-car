import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

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


  constructor(private ref: ChangeDetectorRef) {
    annyang.setLanguage('es-ES');
    const that = this;

    annyang.addCommands({
      'telefono': function () {
        that.hideTelefono();
      },
      'agenda': function () {
        that.hideAgenda();
      },
      'favoritos': function () {
        that.hideFavoritos();
      },
      'marcar': function () {
        that.hideTeclado();
      },
      'llamar': function () {
        that.hideLlamar();
      }
    });
    annyang.start();
  }


  ngOnInit() {}
  //======================MOSTRAR Y OCULTAR EFECTOS==============
  hideTelefono() {
    if (this.pantalla === 'telefono') {
      this.pantalla = '';
    } else {
      this.pantalla = 'telefono';
    }
    this.ref.detectChanges();
  }

  hideAgenda() {
    if (this.seleccion === 'agenda') {
      this.seleccion = '';
    } else {
      this.seleccion = 'agenda';
    }
    this.ref.detectChanges();
  }

  hideFavoritos() {
    if (this.seleccion === 'favoritos') {
      this.seleccion = '';
    } else {
      this.seleccion = 'favoritos';
    }
    this.ref.detectChanges();
  }

  hideTeclado() {
    if (this.seleccion === 'marcar') {
      this.seleccion = '';
    } else {
      this.seleccion = 'marcar';
    }
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
  }

  borrarNum() {
    this.numTel = this.numTel.substring(0, this.numTel.length - 1);
  }

  llamar(nombre) {
    this.contacto = nombre;
  }
  mensajeLlamada(mensaje){
    this.mensaje = mensaje
  }
  addFavoritos(nombre){
    this.favoritos.push(nombre);
  }
}
