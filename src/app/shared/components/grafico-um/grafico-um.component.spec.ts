import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoUmComponent } from './grafico-um.component';

describe('GraficoUmComponent', () => {
  let component: GraficoUmComponent;
  let fixture: ComponentFixture<GraficoUmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoUmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
