import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberFilterService {
  private apiUrl = 'https://localhost:7255/api/TeamMember/';

  constructor(private http: HttpClient) { }

  getMembersCompletedMoreThanXProjects(x: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}CompletedMoreThanXProjects?x=${x}`);
  }

  getMembersAttendedLessThanXMeetings(x: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}AttendedLessThanXMeetings?x=${x}`);
  }

  getEmployeeOfTheYear(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}EmployeeOfTheYear`);
  }



}
