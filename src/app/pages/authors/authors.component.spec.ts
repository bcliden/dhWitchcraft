import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AuthorsPageComponent } from "./authors.component";

describe("AuthorsPageComponent", () => {
  let component: AuthorsPageComponent;
  let fixture: ComponentFixture<AuthorsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
