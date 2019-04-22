import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  Router
} from '@angular/router';



declare let annyang;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  pantalla = '';
  seleccion = '';
  hiddenScreen = true;
  hidenCruce = true;
  hidenLargas = true;
  hidenAnti = true;
  hidenAntiTras = true;
  hidenParabrisas = true;
  hidenRetrovisor = true;
 // hidenTelefono = true;
  accionSubirDerecha = false;
  accionBajarDerecha = false;
  accionSubirIzquierda = false;
  accionBajarIzquierda = false;
  commands = null;
  actual: number;
  velocidad: number;
  flag: boolean;
  divPintados: Array<any>;



  constructor(private router: Router, private ref: ChangeDetectorRef) {
    annyang.setLanguage('es-ES');
    const that = this;

//COMANDOS DE VOZ
    annyang.addCommands({
      'pantalla': function () {
        that.hideScreen();
      },
      'cortas': function () {
        that.hideCruce();
      },
      'largas': function () {

        that.hideLargas();
      },
      'antiniebla': function () {
        that.hideAnti();
      },
      'parabrisas': function () {
        that.hideParabrisas();
      },
      'retrovisor': function () {
        that.hideRetrovisor();
      },
      'subir temperatura': function(){
        that.incrementar();
      },
      'bajar temperatura': function(){
        that.decrementar();
      },
      'subir ventilador': function(){
        that.subirVelocidad();
      },
      'bajar ventilador': function(){
        that.bajarVelocidad();
      },
      'bajar ventanilla izquierda': function(){
        that.bajarVentIzq();
      },
      'subir ventanilla izquierda': function(){
        that.subirVentIzq();
      },
      'bajar ventanilla derecha': function(){
        that.bajarVentDech();
      },
      'subir ventanilla derecha': function(){
        that.subirVentDech();
      }
    });
    annyang.start();
  }
//====================================================
  ngOnInit() {
    this.actual = 21;
    this.velocidad = 0;
    this.divPintados = [false, false, false, false, false];
  }

  redirect(url) {
    this.router.navigateByUrl(url);
  }

//============================MOSTRAR Y OCULTAR EFECTOS============================
  hideScreen() {
   if(this.pantalla === 'pantalla'){
     this.pantalla = '';
   } else {
     this.pantalla = 'pantalla';
   }
    this.ref.detectChanges();
  }
  hideCruce() {
    this.hidenCruce = !this.hidenCruce;
    this.ref.detectChanges();
  }
  hideLargas() {
    this.hidenLargas = !this.hidenLargas;
    this.ref.detectChanges();
  }
  hideAnti() {
    this.hidenAnti = !this.hidenAnti;
    this.ref.detectChanges();
  }
  hideAntiTras() {
    this.hidenAntiTras = !this.hidenAntiTras;
    this.ref.detectChanges();
  }
  hideParabrisas() {
    this.hidenParabrisas = !this.hidenParabrisas;
    this.ref.detectChanges();
  }
  hideRetrovisor() {
    this.hidenRetrovisor = !this.hidenRetrovisor;
    this.ref.detectChanges();
  }


  //==========================================================
  //ELEVALUNAS
  subirVentDech() {
    this.accionSubirDerecha =false;
    this.ref.detectChanges();
  }
  bajarVentDech() {
    this.accionSubirDerecha = true;
    this.ref.detectChanges();
  }
  subirVentIzq() {
    this.accionSubirIzquierda = false;
    this.ref.detectChanges();
  }
  bajarVentIzq() {
    this.accionSubirIzquierda =true ;
    this.ref.detectChanges();
  }
  //=========================================================
  //TEMPERATURA
  incrementar() {
    if (this.actual >= 16 && this.actual < 32) {
      this.actual++;
    }
    this.ref.detectChanges();
  }

  decrementar() {
    if (this.actual > 16 && this.actual <= 32) {
    this.actual--;
    }
    this.ref.detectChanges();
  }

  fijar(v: number) {
    this.actual = v;
    this.ref.detectChanges();
  }
  //===========================================
  //VENTILADOR
  subirVelocidad(){
    this.velocidad++
    this.checkClases(true);
    this.ref.detectChanges();
  }
  bajarVelocidad() {
    if(this.velocidad > 0){
      this.velocidad--
      this.checkClases(false);
      this.ref.detectChanges();
    }

  }
  checkClases(flag) {
    if (flag) {
      for (let i=0; i < this.velocidad; i++) {
        this.divPintados[i] = flag
      }
    } else {
      for (let i=5; i >= this.velocidad; i--) {
        this.divPintados[i] = flag;
      }
    }
  }
  //==============================================




}
