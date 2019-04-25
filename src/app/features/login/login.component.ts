import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicio } from "src/servicios/api.servicio";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showError: boolean;

  constructor(private router: Router, private apiServicio: ApiServicio) { }

  ngOnInit() {
  }


  onSave(evt) {
    this.apiServicio.login(evt).then(
      response => {
        this.router.navigate(['home']);
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

