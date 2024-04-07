import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetTokenService } from '../AuthServices/get-token.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateNewProjectService {
  private apiUrl = 'https://localhost:7255/api/Projects';

  constructor(private http: HttpClient,
    private tokenService: GetTokenService
  ) { }

  createProject(projectName: string, description: string, fromDate: string, toDate: string, status: number, projectOwner: string): Observable<any> {
    const url = `${this.apiUrl}/${projectName}/${description}/${fromDate}/${toDate}/${status}/${projectOwner}`;

    const token = this.tokenService.getStoredToken();

    if (!token) {
      console.error("Token is missing. Please ensure the user is logged in and the token is set.");
      return throwError("Token is missing.");
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.post(url, null, { headers: headers });
  }


}
