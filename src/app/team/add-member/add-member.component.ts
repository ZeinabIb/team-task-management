import { Component } from '@angular/core';
import {AddMemberService  } from '../../../Services/TeamServices/add-member-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class MemberFormComponent {
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  position: string | undefined;
  users: any[] = []; // Array to store user data

  password: string | undefined;

  projectsCompleted: string | undefined;
  meetingsAttended: string | undefined;
  issuesResolved: string | undefined;

  constructor(private userService: AddMemberService,
    private addTeamMemberService : AddMemberService,
  ) {}

  // addUser() {
  //   console.log("username : ", this.username);
  //   this.userService.addUser(this.username ?? '', this.fullName ?? '', this.email ?? '', this.position ?? '').subscribe(
  //     (user) => {
  //       console.log('User added successfully');
  //       this.users.push(user); // Add the newly created user to the array
  //       // You can handle success here, such as displaying a success message
  //     },
  //     (error) => {
  //       console.error('Failed to add user:', error);
  //       // You can handle errors here, such as displaying an error message
  //     }
  //   );
  // }

  editUser(user: any) {
    // Add edit functionality here
    console.log('Editing user:', user);
  }

  deleteUser(user: any) {
    // Add delete functionality here
    console.log('Deleting user:', user);
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1); // Remove the user from the array
    }
  }

  addUser() {
    const memberData = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      position: this.position,
      projectsCompleted: this.projectsCompleted,
      meetingsAttended: this.meetingsAttended,
      issuesResolved: this.issuesResolved
    };

    console.log('Member Data:', memberData); // Log memberData to inspect

    this.addTeamMemberService.addTeamMember(memberData)
      .subscribe(
        (response: any) => {
          console.log('User added successfully:', response);
          // Optionally, handle success here, such as displaying a success message
          // or navigating to another page
          this.resetForm(); // Reset the form fields after successful addition
        },
        (error: any) => {
          console.error('Failed to add user:', error);
          // Optionally, handle errors here, such as displaying an error message
        }
      );
  }


  resetForm(): void {
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.position = '';
    this.projectsCompleted = '';
    this.meetingsAttended = '';
    this.issuesResolved = '';
    // Reset other form fields if needed
  }
}
