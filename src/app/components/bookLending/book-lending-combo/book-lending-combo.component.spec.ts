import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLendingComboComponent } from './book-lending-combo.component';

describe('BookLendingComboComponent', () => {
  let component: BookLendingComboComponent;
  let fixture: ComponentFixture<BookLendingComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookLendingComboComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLendingComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
