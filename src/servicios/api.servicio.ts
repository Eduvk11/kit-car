import {
  environment
} from "../environments/environment";
import {
  Injectable
} from "@angular/core";
import {
  HttpClient
} from "@angular/common/http";
import {
  Router
} from "@angular/router";


@Injectable()
export class ApiServicio {

  constructor(private http: HttpClient, private router: Router) {}

  set token(value: string) {
    window.localStorage.token = value;
  }

  get token() {
    return window.localStorage.token;
  }

  login(evt) {
    return this.http.post(`${environment.apiUrl}/auth/sign-in`, evt).toPromise().then((res: any) => {
      if (res.token) {
        this.token = res.token;
      }
    });
  }

  registro(evt) {
    return this.http.post(`${environment.apiUrl}/auth/sign-up`, evt).toPromise().then((res: any) => {
      this.router.navigate(['home'])
    });
  }

}
