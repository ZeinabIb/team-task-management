import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component'; // Assuming you have a LoginComponent for the dialog

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectedValue = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

  onSelect(value: string) {
    this.selectedValue.emit(value);
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px', // Set the width of the dialog
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.onSelect('logout');
  }

  login(){
    this.openLoginDialog();
  }
}
