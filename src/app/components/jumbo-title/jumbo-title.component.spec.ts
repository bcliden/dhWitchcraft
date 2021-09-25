import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JumboTitleComponent } from './jumbo-title.component';

describe('JumboTitleComponent', () => {
  let component: JumboTitleComponent;
  let fixture: ComponentFixture<JumboTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JumboTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumboTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
