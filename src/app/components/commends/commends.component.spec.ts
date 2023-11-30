import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommendsComponent } from './commends.component';

describe('CommendsComponent', () => {
  let component: CommendsComponent;
  let fixture: ComponentFixture<CommendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommendsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
