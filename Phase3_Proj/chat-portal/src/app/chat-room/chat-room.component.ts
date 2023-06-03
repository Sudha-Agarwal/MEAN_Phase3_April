import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  chatRooms: string[] = [];
  socket!: Socket;
  username: string = 'John';
  chatRoom: string = 'your_chat_room_name';

  constructor(private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit() {
   
    this.fetchChatRooms();
  }

  fetchChatRooms() {
    alert("fetching chat rooms")
    // Send a GET request to the API endpoint to fetch the list of chat rooms
    this.http.get<any>('http://192.168.1.51:3000/chat-rooms')
      .subscribe(
        (response) => {
          this.chatRooms = response.chatRooms;
        },
        (error) => {
          console.error('Error fetching chat rooms:', error);
          // Handle error (e.g., display error message)
        }
      );
  }

  connectToChatRoom(chatRoomName: string): void {
    localStorage.setItem('chatroom', chatRoomName);          
      /*this.socketService.socket.on('connect', () => {
            console.log('Connected to Socket.io server');
          });    */
    // Continue with other socket event listeners and logic
  }

}
