import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindMemberByNameService {
private apiUrl = 'https://localhost:7205/api/User/GetUserByUsername'

constructor(private http: HttpClient) { }

findMember(username: string) {
  const url = `${this.apiUrl}?username=${username}`;
  return this.http.get(url);
}
}
