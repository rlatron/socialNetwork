import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibleConnectionsComponent } from './possible-connections.component';

describe('PossibleConnectionsComponent', () => {
  let component: PossibleConnectionsComponent;
  let fixture: ComponentFixture<PossibleConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PossibleConnectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PossibleConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
