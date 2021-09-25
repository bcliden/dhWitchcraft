import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { WorksCitedPageComponent } from "./workscited.component";

describe("WorksCitedPageComponent", () => {
  let component: WorksCitedPageComponent;
  let fixture: ComponentFixture<WorksCitedPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WorksCitedPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksCitedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
