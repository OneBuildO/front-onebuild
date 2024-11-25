import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasOfertasComponent } from './minhas-ofertas.component';

describe('MinhasOfertasComponent', () => {
  let component: MinhasOfertasComponent;
  let fixture: ComponentFixture<MinhasOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasOfertasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinhasOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
