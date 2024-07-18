import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-modalRemove',
  templateUrl: './modalRemove.component.html',
  styleUrls: ['./modalRemove.component.css'],
  imports: [CommonModule]
})
export class ModalRemoveComponent {
  @Input() show: boolean = false;
  @Input() title: string = "Modal";
  @Input() size: string = "xl:max-w-7xl";
  @Input() footer: boolean = true;

  @Output() closeModal = new EventEmitter<boolean>();
  @Output() confirmRemove = new EventEmitter<boolean>();

  handleConfirmeRemove(){
    this.show = false;
    this.confirmRemove.emit(true);
  }

  onModalClose() {
    this.show = false;
    this.closeModal.emit(this.show);
  }

}
