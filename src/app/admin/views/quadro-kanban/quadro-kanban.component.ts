import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-quadro-kanban',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './quadro-kanban.component.html',
  styleUrl: './quadro-kanban.component.css',
})
export class QuadroKanbanComponent {
  constructor() {
    this.modalCompnent = new ModalComponent();
  }

  modalCompnent: ModalComponent;
  showDetailModal: boolean = false;

  detailsModal(): void {
    this.showDetailModal = !this.showDetailModal;
  }

  onModalDetailsHandler(event: boolean) {
    this.showDetailModal = event;
  }
}
