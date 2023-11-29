import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommendListComponent } from './commend-list.component';

describe('CommendListComponent', () => {
  let component: CommendListComponent;
  let fixture: ComponentFixture<CommendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommendListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
