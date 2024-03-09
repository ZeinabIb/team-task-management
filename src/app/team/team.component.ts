import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberService } from '../../Services/TeamServices/add-member-service.service';
import { DeleteMemberService } from '../../Services/TeamServices/delete-member.service';
import { FindMemberByNameService } from '../../Services/TeamServices/find-member-by-name.service'; // Import the FindMemberByNameService

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  addmember = false;
  users: any[] = [];
  selectedUser: any | null = null;
  name : string ='';

  readonly APIUrl = "https://localhost:7205/api/User/";

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private userService: AddMemberService,
    private deleteMemberService: DeleteMemberService,
    private findMemberByNameService: FindMemberByNameService // Inject the FindMemberByNameService
  ) {
    this.refreshUsers();
  }

  refreshUsers() {
    this.http.get<any[]>(this.APIUrl + 'GetUser').subscribe((data: any[]) => {
      this.users = data;
    });
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
    this.deleteMemberService.deleteMember(userId).subscribe(() => {
      console.log('User deleted successfully');
      this.refreshUsers();
    }, (error) => {
      console.error('Error deleting user:', error);
    });
  }

  findMember(username: string): void {
    this.findMemberByNameService.findMember(username).subscribe((data: any) => {
      this.users = data;
    });
  }
}
