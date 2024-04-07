import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberService } from '../../Services/TeamServices/add-member-service.service';
import { DeleteMemberService } from '../../Services/TeamServices/delete-member.service';
import { FindMemberByNameService } from '../../Services/TeamServices/find-member-by-name.service'; // Import the FindMemberByNameService
import { GetTeamListService } from '../../Services/TeamServices/get-team-list.service';
import { TeamMemberFilterService } from '../../Services/TeamServices/team-member-filter.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {

  projects: number = 5; // Default value for number of projects
  meetings: number = 0; // Default value for number of meetings
  members: any[] = [];
  users: any[] = [];
  selectedUser: any | null = null;
  addmember: boolean = false;
  name: string = '';

  readonly APIUrl = "https://localhost:7205/api/User/";

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private userService: AddMemberService,
    private deleteMemberService: DeleteMemberService,
    private findMemberByNameService: FindMemberByNameService, // Inject the FindMemberByNameService
    private teamMemberService: GetTeamListService,
    private teamMemberFilterService : TeamMemberFilterService,
  ) {

  }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers(): void {
    this.teamMemberService.getAllMembers().subscribe(
      (members) => {
        this.users = members;
      },
      (error) => {
        console.error('Error fetching members:', error);
      }
    );
  }

  selectUser(user: any): void {
    this.selectedUser = user;
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  AddNewMember(addmember: boolean) {
    this.addmember = addmember;
  }

  editUser(user: any): void {
    console.log('Editing user:', user);
    // Implement edit functionality here
  }

  deleteUser(userId: number): void {
    console.log('Deleting user:');
  }

  findMember(username: string): void {
    this.findMemberByNameService.findMember(username).subscribe((data: any) => {
      this.users = data;
    });
  }
  displayedNames: string[] = [];

  getMembersCompletedMoreThanXProjects(x: number) {
    this.teamMemberFilterService.getMembersCompletedMoreThanXProjects(x)
      .subscribe((data) => {
        this.displayedNames = data.map((member: { fullName: string }) => member.fullName);
      });
  }




  getMembersAttendedLessThanXMeetings(x: number) {
    this.teamMemberFilterService.getMembersAttendedLessThanXMeetings(x)
      .subscribe((data) => {
        // Handle data returned from the API
        console.log(data);
      });
  }

  getEmployeeOfTheYear() {
    this.teamMemberFilterService.getEmployeeOfTheYear()
      .subscribe((data) => {
        // Assuming data is the object returned by getEmployeeOfTheYear()
        this.displayedNames = [data.fullName];
        console.log(data.fullName); // Logging the fullName
      });
  }



}
