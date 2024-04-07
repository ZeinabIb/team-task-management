import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchProjectByNameService {
  private apiUrl = 'https://localhost:7255/api/Projects/ByName/';

  constructor(private http: HttpClient) { }

  searchProjectByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + name);
  }
}
