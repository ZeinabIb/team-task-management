import { Component } from '@angular/core';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.css'
})
export class DraftComponent {
  selectedItem: string | undefined;
  itemsList: string[] = [];

  addItem() {
    if (this.selectedItem) {
      this.itemsList.push(this.selectedItem);
      this.selectedItem = '';
    }
  }
}
