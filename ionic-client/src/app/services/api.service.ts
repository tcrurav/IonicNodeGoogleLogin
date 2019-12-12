import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { OAuth2Data } from '../models/oauth2data';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { API_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = API_URL;

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // The registration returns a token from the API.
  register(item: OAuth2Data): Observable<string>{
    return this.http
      .post<string>(this.base_path + "/oauth2/register", JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
