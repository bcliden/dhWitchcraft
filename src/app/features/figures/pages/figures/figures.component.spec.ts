import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { FiguresPageComponent } from "./figures.component";

describe("FiguresPageComponent", () => {
  let component: FiguresPageComponent;
  let fixture: ComponentFixture<FiguresPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FiguresPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiguresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
