import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    this.http.post<{ token: string }>('http://localhost:3000/login', {
      username: this.username,
      password: this.password,
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        console.log('Logged in successfully!');        
      },
      error:  (err) => {
        console.error('Login failed', err);
      }
    });      
  }
}

