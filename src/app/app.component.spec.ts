import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { provideRouter } from "@angular/router";
import { Component } from "@angular/core";
import { APP_TITLES } from "./core/constants";

@Component({ template: "" })
class MockComponent {}

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockComponent],
      providers: [
        provideRouter([
          { path: "", component: MockComponent },
          { path: "cart", component: MockComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should have title "Transaction Cart"', () => {
    expect(component.title).toEqual(APP_TITLES.MAIN);
  });

  it("should render router outlet", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("router-outlet")).toBeTruthy();
  });
});
