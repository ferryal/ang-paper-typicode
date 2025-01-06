import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { User } from '../../models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let debugElement: DebugElement;

  const mockUsers: User[] = [
    {
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
        name: 'Company Name',
        bs: 'Bs',
        catchPhrase: 'catchPhrase',
      },
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      address: {
        street: 'Victor Plains',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        suite: 'Suite 879',
      },
      company: {
        name: 'Company Name',
        bs: 'Bs',
        catchPhrase: 'catchPhrase',
      },
    },
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    userServiceSpy.getUsers.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the spinner while loading', () => {
    spyOn(component, 'ngOnInit');
    component.loading = true;

    fixture.detectChanges();

    const spinner = debugElement.query(By.css('.spinner-container'));
    expect(spinner).toBeNull();
  });

  it('should handle errors and hide the spinner', () => {
    userService.getUsers.and.returnValue(
      throwError(() => new Error('Service error'))
    );

    fixture.detectChanges();

    // Assert: Check that loading is false and users remain empty
    expect(component.loading).toBeFalse();
    expect(component.users).toEqual([]);
  });

  it('should populate users and hide the spinner when data is fetched', () => {
    userService.getUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges();

    // Assert: Verify the users are populated and loading is false
    expect(component.users).toEqual(mockUsers);
    expect(component.loading).toBeFalse();

    // Assert: Check if the table rows are rendered
    const tableRows = debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(mockUsers.length);
  });

  it('should display user data in the table', () => {
    userService.getUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges();

    // Assert: Check if the first user's data is displayed correctly
    const firstRow = debugElement.query(By.css('tbody tr')).nativeElement;
    expect(firstRow.textContent).toContain('Leanne Graham');
    expect(firstRow.textContent).toContain('Sincere@april.biz');
    expect(firstRow.textContent).toContain('hildegard.org');
  });
});
