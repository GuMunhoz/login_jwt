import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './model/login-model';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient , private router : Router) { }

  public sign(payload: LoginModel): Observable<any> {
    return this.http.post<{token:string}>(`${this.url}/sign`, payload).pipe(
      map((data:any)=> {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', data.token);
        return this.router.navigate(['admin']);
      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message)

        return throwError(
          () =>
          'No momento não estamos conseguindo validar estes dados, tente novamente mais tarde.'
          );
      })
    )
  }

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if(!token) return false;
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
}
