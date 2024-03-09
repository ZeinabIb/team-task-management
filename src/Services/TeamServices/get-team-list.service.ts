import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTeamListService {
  private apiUrl = 'https://localhost:7205/api/User/GetUser';

  constructor(private http: HttpClient) { }

  getTeamList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}































