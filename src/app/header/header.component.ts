import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectedValue = new EventEmitter<string>();

  onSelect(value: string){
    this.selectedValue.emit(value);
  }
}
