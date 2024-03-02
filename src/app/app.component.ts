import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Note: Correct property name is styleUrls, not styleUrl
})
export class AppComponent {
  title = 'team-task-management';

  selectedValue = 'team'; // Default value is 'team'

  // Method to handle navigation changes
  onNavigate(value: string) {
    this.selectedValue = value;
  }
}
