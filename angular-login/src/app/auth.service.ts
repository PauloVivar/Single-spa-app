import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs';
//import { response } from 'express';

interface LoginResponse {
  id: number;
  userName: string;
  userPassword: string;
}

@Injectable({
  providedIn:'root'
})
export class AuthService {
  //private loginUrl = 'http://185.209.230.19:8081/user/login';
  private loginUrl = '/api/user/login';


  constructor(private http: HttpClient){

  }

  login(userName: string, userPassword: string): Observable<LoginResponse> {
    const body = { userName, userPassword };
    console.log('Intentando login con:', body);
    console.log('URL de login:', this.loginUrl);

    return this.http.post<LoginResponse>(this.loginUrl, body).pipe(
     tap((response:LoginResponse)=>{
      sessionStorage.setItem('user',JSON.stringify(response));
      this.redirectToTasks(); // Llamamos a la redirección de la app todolist React
     }),
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    let errorMessage= 'Ocurrio un error';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Client-side error: ${error.error.message}`;
    }else {
      errorMessage= `Server error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(()=> new Error(errorMessage));
  }

  logout(): void {
    sessionStorage.removeItem('user');
  }

  isAuthenticated():boolean{
    return !!sessionStorage.getItem('user');
  }

  // método para redirección
  private redirectToTasks(): void {
    window.location.href = 'http://localhost:9000/tasks';
  }

}
