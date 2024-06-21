import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// providing mock implementation
class MockUserService {
  getUsers() {
    const mockUsers = [
      { id: 1, fname: 'Sachin',lname:"Tendulkar" },
      { id: 2, fname: 'Saurav',lname:"Ganguly" }
      // Add more mock products as needed
    ];
    return of(mockUsers);
  }
}
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),provideHttpClientTesting(),
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'unitTestDemo' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('unitTestDemo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, unitTestDemo');
  });
  it("should test multiplication of number",()=>{
    // Arrange
    let firstNumber = 10;
    let secondNumber = 10;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Act
    let result = app.multiply(firstNumber,secondNumber);
  
    //Assert
    expect(result).toBe(100);
  })
  it('should retrieve products', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const userService = TestBed.inject(UserService);
    component.getData();
    tick();
    expect(component.users).toEqual([
      { id: 1, fname: 'Sachin',lname:"Tendulkar" },
      { id: 2, fname: 'Saurav',lname:"Ganguly" }
    ]);
  }));
  it('should also retrieve products', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const userService = TestBed.inject(UserService);
    
    const mockUsers=[
      { id: 3, fname: 'Rahul',lname:"Dravid" },
      { id: 4, fname: 'Yuvraj',lname:"Singh" }
    ]
    const userServiceSpy = spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));
    component.getData();
    // Use tick() to simulate the passage of time until all asynchronous operations are completed
    tick();
    // Now you can assert that the component's products property has been updated
    expect(component.users).toEqual(mockUsers);
    expect(userServiceSpy).toHaveBeenCalled();
  }));
});
