import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  socket!: Socket;

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    // Perform authentication logic by calling the login API
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://192.168.1.51:3000/login', loginData)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          
          /*this.socketService.socket.on('connect', () => {
            console.log('Connected to Socket.io server');
          });*/
        
         //manual navigation or navigation through code
          this.router.navigate(['/chat-rooms']);
        },
        (error) => {
          console.error('Error logging in:', error);
          // Handle login error (e.g., display error message)
        }
      );
  }
}
