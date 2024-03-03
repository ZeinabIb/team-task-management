import { Component, Output, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIfContext } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
 addmember:boolean = false;
  projectContributions = [
    {
      projectName: 'Project A',
      role: 'Team Lead',
      tasksCompleted: [
        'Implemented feature X',
        'Resolved bug Y',
        'Conducted code reviews'
      ],
      achievements: 'Received employee of the month award'
    },
    {
      projectName: 'Project B',
      role: 'Developer',
      tasksCompleted: [
        'Refactored codebase',
        'Improved performance',
        'Participated in daily stand-ups'
      ],
      achievements: 'Successfully met project deadline'
    }
  ];


readonly APIUrl = "https://localhost:7205/api/User/";
modal: any;


constructor(private http: HttpClient, private modalService: NgbModal) {
}

users: any[] = []; // Change the type of the 'users' array to 'Object[]'
selectedUser: any | null = null;

refreshUsers() {
  this.http.get(this.APIUrl + 'GetUser').subscribe(data => {
    this.users = data as any[]; // Cast the data to 'Object[]'
  });
}

ngOnInit() {
  this.refreshUsers();

}

selectUser(user: any):void {
  this.selectedUser = user;
  console.log(this.selectedUser);
}


//function to open modal
openModalFunction(content:any){
this.modalService.open(content);
}

//function to close modal
closeModalFunction(){
this.modalService.dismissAll();
}

AddNewMember(addmember:boolean){
this.addmember = addmember;
}
}
