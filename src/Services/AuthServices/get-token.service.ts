
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {
  private apiUrl = 'https://localhost:7255/api/Identity';
  private token: string = '';

  constructor(private http: HttpClient) { }

  getToken(username: string): Observable<any> {
    let role = 'user';
    if (username === 'admin') {
      role = 'admin';
    } else if (username === 'team lead') {
      role = 'teamLead';
    }

    const body = {
      claims: {
        role: role
      }
    };

    return this.http.post<any>(`${this.apiUrl}/token`, body);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getStoredToken(): string {
    return this.token;
  }
}
