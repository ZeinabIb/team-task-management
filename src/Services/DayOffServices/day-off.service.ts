// day-off.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DayOffService {

  private apiUrl = 'https://localhost:7255/api/DayOff';

  constructor(private http: HttpClient) { }

  requestDayOff(formData: any) {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
