import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
    },
  ];

  const mockUserDetails = {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched HTTP requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users via GET', () => {
    service.getUsers().subscribe((users) => {
      // Assert
      expect(users).toEqual(mockUsers);
    });

    // HTTP request assertion
    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); // Simulate the response
  });

  it('should fetch user details via GET', () => {
    const userId = 1;

    service.getUserDetails(userId).subscribe((user) => {
      // Assert
      expect(user).toEqual(mockUserDetails);
    });

    // HTTP request assertion
    const req = httpMock.expectOne(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUserDetails); // Simulate the response
  });
});
