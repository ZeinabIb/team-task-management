import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetTeamListService {
  private apiUrl = 'https://localhost:7255/api/TeamMember';

  constructor(private http: HttpClient) { }

  getTeamList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  private apiUrl2 = 'https://localhost:7255/api/TeamMember';



  getAllMembers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }


}































