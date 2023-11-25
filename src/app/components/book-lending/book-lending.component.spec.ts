import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLendingComponent } from './book-lending.component';

describe('BookLendingComponent', () => {
  let component: BookLendingComponent;
  let fixture: ComponentFixture<BookLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookLendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
