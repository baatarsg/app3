import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Country } from './country';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  private backUrl = "http://localhost:3000/";

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.backUrl + "api/countries")
      .pipe(
        catchError(this.handleError<Country[]>('getCountries', []))
      );
  }

  getCountryNo404<Data>(id: number): Observable<Country> {
    const url = `${this.backUrl}api/countries/${id}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries[0]),
        catchError(this.handleError<Country>(`getCountry id=${id}`))
      );
  }

  getCountry(id: number): Observable<Country> {
    const url = `${this.backUrl}api/countries/${id}`;
    return this.http.get<Country>(url)
      .pipe(
        catchError(this.handleError<Country>(`getCountry id=${id}`))
    );
  }

  searchCountries(term: string): Observable<Country[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Country[]>(`${this.backUrl}api/countries/?name=${term}`)
      .pipe(
        catchError(this.handleError<Country[]>('searchCountries', []))
    );
  }

  addCountry (country: Country): Observable<Country> {
    return this.http.post<Country>(`${this.backUrl}api/countries`, country, httpOptions)
      .pipe(
        catchError(this.handleError<Country>('addCountry'))
    );
  }

  deleteCountry (country: Country | number): Observable<Country> {
    const id = typeof country === 'number' ? country : country.id;
    const url = `${this.backUrl}api/countries/${id}`;
    return this.http.delete<Country>(url, httpOptions)
      .pipe(
        catchError(this.handleError<Country>('deleteCountry'))
    );
  }

  updateCountry (country: Country): Observable<any> {
    return this.http.put(`${this.backUrl}api/countries/${country.id}`, country, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateCountry'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}