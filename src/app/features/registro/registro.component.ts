import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  onSave() {
    this.router.navigate(['..', 'login']);

  }
  redirect(url) {
    this.router.navigateByUrl(url);
  }
}
