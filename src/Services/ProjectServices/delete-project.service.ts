import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetTokenService } from '../AuthServices/get-token.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteProjectService {
  private apiUrl = 'https://localhost:7255/api/Projects';

  constructor(private http: HttpClient, private tokenService: GetTokenService) { }

  deleteProject(projectId: number): Observable<any> {
    const url = `${this.apiUrl}/${projectId}`;

    // Retrieve token
    const token = this.tokenService.getStoredToken();

    // Check if token exists
    if (!token) {
      console.error("Token is missing. Please ensure the user is logged in and the token is set.");
      return throwError("Token is missing.");
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.delete(url, { headers: headers });
  }
}
