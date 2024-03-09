import { Component } from '@angular/core';
import { GetTeamListService } from '../../Services/TeamServices/get-team-list.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent {
  members: string[] =[];

  constructor(private teamListService: GetTeamListService) { }

  ngOnInit(): void {
    this.fetchTeamList();

  }
  fetchTeamList() {
    this.teamListService.getTeamList().subscribe(
      (data: any[]) => {
        console.log('Data from API:', data);
        this.members = data.map(member => member.Username);
      },
      error => {
        console.error('Error fetching team list:', error);
      }
    );
  }

}


