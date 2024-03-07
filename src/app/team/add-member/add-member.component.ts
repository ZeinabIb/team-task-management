import { Component } from '@angular/core';
import { AddMemberService } from '../../../TeamServices/add-member-service.service';

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

  constructor(private userService: AddMemberService) {}

  addUser() {
    console.log("username : ", this.username);
    this.userService.addUser(this.username ?? '', this.fullName ?? '', this.email ?? '', this.position ?? '').subscribe(
      (user) => {
        console.log('User added successfully');
        this.users.push(user); // Add the newly created user to the array
        // You can handle success here, such as displaying a success message
      },
      (error) => {
        console.error('Failed to add user:', error);
        // You can handle errors here, such as displaying an error message
      }
    );
  }

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
}
