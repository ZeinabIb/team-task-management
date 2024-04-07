import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostMemberRoleService {
  private apiUrl = 'https://localhost:7255/api/MemberRole';

  constructor(private http: HttpClient) { }

  postMemberRole(memberName: string, projectName: string, role: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { memberName, projectName, role });
  }
}
