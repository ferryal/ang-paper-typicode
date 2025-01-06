import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { User } from '../../models/user.model';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;
  let debugElement: DebugElement;

  const mockUser: User = {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    address: {
      street: 'Kulas Light',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      suite: 'Apt. 556',
    },
    company: {
      name: 'Romaguera-Crona',
      bs: 'harness real-time e-markets',
      catchPhrase: 'Multi-layered client-server neural-net',
    },
  };

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUserDetails',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the loading skeleton while loading', () => {
    userService.getUserDetails.and.returnValue(of(mockUser));

    fixture.detectChanges();

    // Assert: Check that the skeleton is displayed while loading
    component.loading = true;
    fixture.detectChanges();

    const skeleton = debugElement.query(By.css('.skeleton'));
    expect(skeleton).toBeTruthy();
  });

  it('should load and display user details', () => {
    userService.getUserDetails.and.returnValue(of(mockUser));

    fixture.detectChanges();

    // Assert: Check that user details are displayed correctly
    const userName = debugElement
      .query(By.css('h2'))
      .nativeElement.textContent.trim();
    expect(userName).toBe(mockUser.name); // Verify user name

    const email = debugElement
      .query(By.css('.detail-row:nth-of-type(1) span:nth-child(2)'))
      .nativeElement.textContent.trim();
    expect(email).toBe(mockUser.email); // Verify email

    const companyName = debugElement
      .query(By.css('.detail-row:nth-of-type(2) span:nth-child(2)'))
      .nativeElement.textContent.trim();
    expect(companyName).toBe(mockUser.company.name); // Verify company name

    const website = debugElement
      .query(By.css('.detail-row:nth-of-type(3) a'))
      .nativeElement.textContent.trim();
    expect(website).toBe(mockUser.website); // Verify website

    const phone = debugElement
      .query(By.css('.detail-row:nth-of-type(4) span:nth-child(2)'))
      .nativeElement.textContent.trim();
    expect(phone).toBe(mockUser.phone); // Verify phone number

    const address = debugElement
      .query(By.css('.detail-row:nth-of-type(5) span:nth-child(2)'))
      .nativeElement.textContent.trim();
    expect(address).toBe(
      `${mockUser.address.street}, ${mockUser.address.city}`
    ); // Verify address
  });

  it('should handle errors and stop loading', () => {
    userService.getUserDetails.and.returnValue(
      throwError(() => new Error('Service error'))
    );

    fixture.detectChanges();

    // Assert: Check that loading is false and user remains null
    expect(component.loading).toBeFalse();
    expect(component.user).toBeNull();
  });

  it('should navigate back to the user list when Back button is clicked', () => {
    userService.getUserDetails.and.returnValue(of(mockUser));

    fixture.detectChanges();

    const backButton = debugElement.query(By.css('.back-button button'));
    backButton.nativeElement.click();

    // Assert: Check that router.navigate is called with the correct route
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
