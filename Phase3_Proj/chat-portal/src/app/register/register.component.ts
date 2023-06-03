import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  register() {
    // Perform registration logic by calling the register API
    const registerData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://192.168.1.51:3000/register', registerData)
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering:', error);
          // Handle registration error (e.g., display error message)
        }
      );
  }
}
