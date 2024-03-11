import { Component } from '@angular/core';
import { GetTeamListService } from '../../Services/TeamServices/get-team-list.service';
import { CreateNewProjectService } from '../../Services/ProjectServices/create-new-project.service';
@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent {
  members: string[] =[];
  selectedMember: string ='' ;
  selectedRole : string ='';
  membersList: { name: string; role: string; }[] = [];


  projectName : string = '';
  description : string = '';

  projects : any[] = [];


  constructor(private teamListService: GetTeamListService, private projectService: CreateNewProjectService) { }

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

  addMember() {
    if (this.selectedMember && this.selectedRole) {
      const existingMemberIndex = this.membersList.findIndex(member => member.name === this.selectedMember && member.role === this.selectedRole);

      if (existingMemberIndex === -1) {
        this.membersList.push({ name: this.selectedMember, role: this.selectedRole });
      } else {
        // If the member with the same name and role already exists, you can handle it here,
        // such as showing a message or preventing the addition of duplicate members.
        // For simplicity, I'm just logging a message here.
        console.log('Member already exists');
      }

      this.selectedMember = '';
      this.selectedRole = '';
    }
  }


  isDuplicateRole(role: string): boolean {
    const count = this.membersList.filter(member => member.role === role).length;
    return count > 1;
  }

  getDuplicateNames(role: string): string {
    const names = this.membersList.filter(member => member.role === role).map(member => member.name);
    return names.join(' - ');
  }

  createProject(){
    console.log("Project name ", this.projectName);
    console.log("Description ", this.description);

    this.projectService.createProject(this.projectName
      , this.description).subscribe(
        (project) => {
          console.log('Project created successfully');
          this.projects.push(project);
        },
        (error) => {
          console.error('Failed to create project:', error);
        }
      );




  }

  }





