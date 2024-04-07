import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddMemberService {
  private apiUrl = 'https://localhost:7255/api/TeamMember'; // Update the API URL accordingly

  constructor(private http: HttpClient) { }

  addTeamMember(memberData: any): Observable<any> {
    // Send memberData as the request body
    return this.http.post<any>(this.apiUrl, memberData);
  }
}
