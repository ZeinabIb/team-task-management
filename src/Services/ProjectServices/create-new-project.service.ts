import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateNewProjectService {
  private apiUrl = 'https://localhost:7205/api/Project/CreateProject';

  constructor(private http: HttpClient) { }

  createProject(projectName: string, description: string){
    const body = {
      ProjectName: projectName,
      Description: description
    };
     return this.http.post(this.apiUrl, body);
    }
  }
