import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'team-task-management';

  selectedValue = 'projectDashboard';

  onNavigate(value: string) {
    this.selectedValue = value;
  }
}
