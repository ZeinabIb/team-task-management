import { Component } from '@angular/core';
import { GetTeamListService } from '../../Services/TeamServices/get-team-list.service';
import { CreateNewProjectService } from '../../Services/ProjectServices/create-new-project.service';
import { GetProjectListService } from '../../Services/ProjectServices/get-project-list.service';
import { MemberProjectServiceService } from '../../Services/MemberRoleServices/member-project-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent {
  members: string[] = [];
  selectedMember: string = '';
  selectedRole: string = '';
  membersList: { name: string; role: string; }[] = [];

  projectName: string | undefined;
  description: string | undefined;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  status: string | undefined;
  projectOwner: string | undefined;

  projects: any[] = [];

  constructor(
    private createProjectService: CreateNewProjectService,
    private projectListService: GetProjectListService,
    private memberProjectService: MemberProjectServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProjectList();
  }

  getProjectList(): void {
    this.projectListService.getProjectList().subscribe(
      (projects) => {
        this.projects = projects;

        // Fetch member role for each project
        this.projects.forEach((project, index) => {
          this.memberProjectService.getMemberRoleByName(project.projectName).subscribe(
            (memberRoles) => {
              // Assign the member roles to the corresponding project
              this.projects[index].memberRoles = memberRoles;
            },
            (error) => {
              console.error('Error fetching member role:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching project list:', error);
      }
    );
  }

  createProject(): void {
    let statusValue: number;
    switch (this.status) {
      case 'Pending':
        statusValue = 0;
        break;
      case 'In Progress':
        statusValue = 1;
        break;
      case 'Completed':
        statusValue = 2;
        break;
      default:
        // Invalid status value
        console.error('Invalid status value. Please select a valid status.');
        return;
    }

    // Proceed with creating the project if status is valid
    this.createProjectService.createProject(
      this.projectName ?? '',
      this.description ?? '',
      this.fromDate?.toString() ?? '',
      this.toDate?.toString() ?? '',
      statusValue, // Use the validated status value
      this.projectOwner ?? ''
    ).subscribe(
      (data) => {
        console.log('Project created successfully:', data);
        // Reset form fields if needed
        this.resetForm();
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating project:', error);
        if (error.status === 401) {
          // Show warning message for unauthorized access
          this.showUnauthorizedWarning();
        }
        // Handle other errors here
      }
    );
  }


  showUnauthorizedWarning(): void {
    // Show warning message for unauthorized access
    alert('Unauthorized! Please login to continue.');
  }

  resetForm(): void {
    this.projectName = '';
    this.description = '';
    this.fromDate = undefined;
    this.toDate = undefined;
    this.status = '';
    this.projectOwner = '';
    // Reset other form fields if needed
  }
}
