import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetTokenService } from '../../Services/AuthServices/get-token.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private tokenService: GetTokenService) {}



  getToken(username: string): void {
    this.tokenService.getToken(username).subscribe(response => {
      const token = response.token; // Assuming the token is returned in the 'token' property
      this.tokenService.setToken(token);
      console.log('Token:', token);
    }, error => {
      console.error('Error:', error);
    });
  }



  login(){
    console.log('Username:');

  }

}
