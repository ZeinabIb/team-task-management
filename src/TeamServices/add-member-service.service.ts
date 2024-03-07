import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddMemberService {
  private apiUrl = 'https://localhost:7205/api/User/AddUser';

  constructor(private http: HttpClient) { }

  addUser(username: string, fullName: string, email: string, position: string) {
    const body = {
      Username: username,
      FullName: fullName,
      Email: email,
      Position: position
    };

    return this.http.post(this.apiUrl, body);
  }
}
