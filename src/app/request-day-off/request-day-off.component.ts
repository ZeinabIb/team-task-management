// request-day-off.component.ts

import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { DayOffService } from '../../Services/DayOffServices/day-off.service';
// member-day-off.model.ts

export interface MemberDayOff {
  memberId: number;
  fullName: string;
  fromDate: Date;
  toDate: Date;
  reason: string;
  isMakingUp: boolean;
  vacationDuration: number;
}

@Component({
  selector: 'app-request-day-off',
  templateUrl: './request-day-off.component.html',
  styleUrls: ['./request-day-off.component.css']
})
export class RequestDayOffComponent {
  viewDate: Date = new Date(); // Current date
  events: CalendarEvent[] = []; // Array to hold calendar events

  formData: MemberDayOff = {
    memberId: 0,
    fullName: '',
    fromDate: new Date(),
    toDate: new Date(),
    reason: '',
    isMakingUp: false,
    vacationDuration: 0
  };
  showAlert: boolean = false;

  constructor(private dayOffService: DayOffService) { }

  onSubmit() {
    this.dayOffService.requestDayOff(this.formData).subscribe(
      (response) => {
        console.log('Request submitted successfully!', response);
        this.showAlert = true;
        this.formData.vacationDuration = response.vacationDuration;
        this.resetForm();
        setTimeout(() => {
          this.showAlert = false; 
        }, 3000);
      },
      (error) => {
        console.error('Error submitting request:', error);
        // Handle error appropriately
      }
    );
  }


  resetForm() {
    this.formData = {
      memberId: 0,
      fullName: '',
      fromDate: new Date(),
      toDate: new Date(),
      reason: '',
      isMakingUp: false,
      vacationDuration: 0
    };
  }

  // Example method to add an event
  addEvent(): void {
    const newEvent: CalendarEvent = {
      start: new Date(), // Event start date
      title: 'New Event' // Event title
    };
    this.events.push(newEvent);
  }

  // Method to navigate to previous month
  prevMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1);
  }

  // Method to navigate to next month
  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1);
  }

  // Method to generate an array of days for the current month
  // getDaysInMonth(date: Date): number[] {
  //   const daysInMonth: number[] = [];
  //   const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  //   for (let i = 1; i <= totalDays; i++) {
  //     daysInMonth.push(i);
  //   }
  //   return daysInMonth;
  // }

  getDaysInMonth(date: Date): { day: number, highlight: boolean }[] {
    const daysInMonth: { day: number, highlight: boolean }[] = [];
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const vacationDays = this.formData.vacationDuration;

    for (let i = 1; i <= totalDays; i++) {
      const highlight = vacationDays > 0 && i <= vacationDays;
      daysInMonth.push({ day: i, highlight });
    }
    return daysInMonth;
  }

}
