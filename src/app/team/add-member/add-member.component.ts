import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent {
  @Input() addmember = true;
  CloseMemeberForm(){
  this.addmember = false;
}
}
