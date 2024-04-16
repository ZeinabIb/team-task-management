import { Component } from '@angular/core';
import { GetTeamListService } from '../../Services/TeamServices/get-team-list.service';
import { CreateNewProjectService } from '../../Services/ProjectServices/create-new-project.service';
import { GetProjectListService } from '../../Services/ProjectServices/get-project-list.service';
import { MemberProjectServiceService } from '../../Services/MemberRoleServices/member-project-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteProjectService } from '../../Services/ProjectServices/delete-project.service';
import { PostMemberRoleService } from '../../Services/MemberRoleServices/post-member-role.service';
import { SearchProjectByNameService } from '../../Services/ProjectServices/search-project-by-name.service';

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
  displaymemberList: any[] = [];
  selectedTeamMember: any | undefined;
  roles: string[] = ['Software Engineer', 'QA Engineer', 'Project Manager', 'Product Manager', 'UI/UX Designer', 'DevOps Engineer', 'Database Administrator'];
  teamselectedRole: string= "";
  Name: string | undefined;
  description: string | undefined;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  status: string | undefined;
  projectOwner: string | undefined;
  projectId= 4;
  projects: any[] = [];
  searchQuery: string = '';
  memberRoles: { memberName: string, role: string }[] = [];
  projectCreated: boolean = false;
  notAuthorized: boolean = false;

  constructor(
    private createProjectService: CreateNewProjectService,
    private projectListService: GetProjectListService,
    private memberProjectService: MemberProjectServiceService,
    private snackBar: MatSnackBar,
    private deleteProjectService : DeleteProjectService,
    private teamListService: GetTeamListService,
    private postMemberRoleService: PostMemberRoleService,
    private searchProjectByName : SearchProjectByNameService
  ) { }

  ngOnInit(): void {
    this.getProjectList();
    this.fetchTeamList();
  }

  getProjectList(): void {
    this.projectListService.getProjectList().subscribe(
      (projects) => {
        this.projects = projects;
        console.log('Fetched projects:', this.projects);

        // Fetch member role for each project
        this.projects.forEach((project, index) => {
          if (project.name) { // Check if project name is defined
            console.log('Fetching member roles for project:', project.name);
            this.memberProjectService.getMemberRoleByName(project.name).subscribe(
              (memberRoles) => {
                // Assign the member roles to the corresponding project
                this.projects[index].memberRoles = memberRoles;
                console.log('Member roles for project', project.name, ':', memberRoles);
              },
              (error) => {
                console.error('Error fetching member roles for project', project.name, ':', error);
              }
            );
          }
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
      this.Name ?? '',
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
          // Set the notAuthorized flag to true to display the modal
          this.notAuthorized = true;
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
    this.Name = '';
    this.description = '';
    this.fromDate = undefined;
    this.toDate = undefined;
    this.status = '';
    this.projectOwner = '';
    // Reset other form fields if needed
  }

  onDeleteProject(project: any): void {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    // Retrieve the project ID from the project object
    const projectIdToDelete = project.projectId;

    console.log('Project ID to delete:', projectIdToDelete);

    this.deleteProjectService.deleteProject(projectIdToDelete).subscribe(
      (data) => {
        console.log('Project deleted successfully:', data);

      },
      (error) => {
        console.error('Error deleting project:', error);

      }
    );
  }
  fetchTeamList(): void {
    this.teamListService.getTeamList().subscribe(
      (data: any[]) => {
        this.displaymemberList = data;
        console.log('Team List:', this.displaymemberList);
      },
      (error) => {
        console.error('Error fetching team list:', error);
      }
    );
  }

  selectTeamMember(member: any): void {
    this.selectedTeamMember = member;
  }
  addMemberRole(): void {
    // Check if selectedTeamMember is defined before accessing its properties
    if (this.selectedTeamMember) {
      // Assuming Name and teamselectedRole are component variables
      this.postMemberRoleService.postMemberRole(this.selectedTeamMember.fullName, this.Name ?? '', this.teamselectedRole ?? '')
        .subscribe(
          (response) => {
            // Handle success
            console.log('Member role added successfully:', response);
            this.projectCreated = true;
            // Find the project by name
            const project = this.projects.find(proj => proj.Name === this.Name);

            if (project) {
              // Add the member role to the current project's memberRoles array
              project.memberRoles.push({
                memberName: this.selectedTeamMember.fullName,
                role: this.teamselectedRole
              });
            } else {
              console.error('Project not found.');
            }
          },
          (error) => {
            // Handle error
            console.error('Error adding member role:', error);
          }
        );
    } else {
      console.error('No team member selected.');
    }
  }

  searchProject(): void {
    if (this.searchQuery.trim() !== '') {
    this.searchProjectByName.searchProjectByName(this.searchQuery).subscribe(
      (projects) => {
        console.log('Search result:', projects);
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching project list:', error);
      }
    );
  }
}

}
