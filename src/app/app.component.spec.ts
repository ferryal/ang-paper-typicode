import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router-outlet element', () => {
    const routerOutlet = debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy(); // Ensure the router-outlet is present
  });
});
