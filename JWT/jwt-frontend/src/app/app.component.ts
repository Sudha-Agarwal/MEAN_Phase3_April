import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'jwt-frontend';
  loggedIn = false;
  username!: string;
  protectedData!: string;

  constructor(private http: HttpClient,private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
      const decodedToken: any = jwt_decode(token);
      this.username = decodedToken.username;
    }
  }
  ngOnInit(): void {
    this.getProtectedData();
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.username = '';
    this.protectedData = '';
  }

  getProtectedData() {
    const token = localStorage.getItem('token');
  let headers = new HttpHeaders();

  if (token) {
    headers = headers.set('Authorization', token);
    this.http.get<any>('http://localhost:3000/protected', { headers }).subscribe(
      (res) => {
        this.protectedData = res.message;
      },
      (err) => {
        console.error('Failed to fetch protected data', err);
      }
    );
  }

    
  }
}


