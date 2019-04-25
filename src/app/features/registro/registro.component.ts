import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicio} from "src/servicios/api.servicio";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  showError: boolean;

  constructor(private router: Router, private apiServicio: ApiServicio) { }

  ngOnInit() {
  }


  onSave(evt) {
    this.apiServicio.registro(evt).then(
      response => {
        this.router.navigate(['login']);
      },
      err => {
        this.showError = true;
      }
    );

  }
  redirect(url) {
    this.router.navigateByUrl(url);
  }
}
