import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommendCardComponent } from './commend-card.component';

describe('CommendCardComponent', () => {
  let component: CommendCardComponent;
  let fixture: ComponentFixture<CommendCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommendCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
