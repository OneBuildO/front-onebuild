import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroKanbanComponent } from './quadro-kanban.component';

describe('QuadroKanbanComponent', () => {
  let component: QuadroKanbanComponent;
  let fixture: ComponentFixture<QuadroKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadroKanbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuadroKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
