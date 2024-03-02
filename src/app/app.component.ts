import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Note: Correct property name is styleUrls, not styleUrl
})
export class AppComponent {
  title = 'team-task-management';

  selectedValue = 'team';
  //readonly APIUrl = "https:/localhost:7205/api/User/";


  // constructor(private http: HttpClient) {

  // }

  // users:any=[];

  // refreshUsers(){
  //   this.http.get(this.APIUrl+'GetUser').subscribe(data=>{
  //     this.users=data;

  //   })
  // }

  // ngOnInit(){
  //   this.refreshUsers();
  // }
  // Method to handle navigation changes
  onNavigate(value: string) {
    this.selectedValue = value;
  }
}
