import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecessionSearchComponent } from './recession-search.component';

describe('RecessionSearchComponent', () => {
  let component: RecessionSearchComponent;
  let fixture: ComponentFixture<RecessionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecessionSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecessionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
