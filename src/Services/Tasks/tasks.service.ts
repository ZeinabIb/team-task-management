import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  // Method to fetch all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7255/api/Tasks');
  }

  // Method to fetch tasks based on project ID
  getTasksByProjectId(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7255/api/Tasks?projectId=${projectId}`);
  }
}
