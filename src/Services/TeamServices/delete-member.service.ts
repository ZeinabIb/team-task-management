import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteMemberService {
  private apiUrl = 'https://localhost:7205/api/User/DeleteUser';

  constructor(private http: HttpClient) { }

  deleteMember(id: number) {

    const url = `${this.apiUrl}?id=${id}`;
    return this.http.delete(url);
  }
}
