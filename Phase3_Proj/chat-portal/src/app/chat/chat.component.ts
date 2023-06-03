import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { io, Socket } from 'socket.io-client';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  loggedIn: boolean = false;
  username: string | null= '';
  room: string | null = '';
  messageContent: string = '';
  chatMessages: any[] = [];
  socket!: Socket;
  notification!: string;
  joinedUsers: string[] = [];
  newJoinedUser!:string;
  userleft!:string;

  constructor(private route: ActivatedRoute, 
    private http: HttpClient,   
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
    ) {
      this.socket = io('http://192.168.1.51:3000', {
        query: { username: localStorage.getItem('username'),chatRoom: localStorage.getItem('chatroom')}
      });
    }



  ngOnInit() {
    
    // Listen for the 'userJoined' event
    /*this.socketService.socket.on('joinedUsers', (message) => {
     console.log(message);
      this.joinedUsers.push(message);
      console.log(message);
      //this.notification = message;
      // Trigger change detection manually
      this.changeDetectorRef.markForCheck();
    });

    this.socketService.socket.on('userJoined', (username: string) => {
      // Handle the userJoined event
      console.log('User joined:', username);
  });*/

  /*this.socketService.getnewUser().subscribe((username) => {
    alert(username);
    console.log(username);
  })*/

  

  // Place your socket connection code here
  this.socket.on('connect', () => {
    console.log('Connected to Socket.io server');

     // Listen for the 'userJoined' event
  this.socket.on('joinedUsers', (message) => {
    console.log(message);
     this.joinedUsers= message;
     console.log(message);       
     // Trigger change detection manually
     this.changeDetectorRef.markForCheck();
   });

   this.socket.on('userJoined', (username: string) => {
    this.newJoinedUser = username;
     console.log('User joined:', username);
     this.changeDetectorRef.detectChanges();
 });
 this.socket.on('newMessage', (newMessage: string) => {
  console.log(newMessage);
  this.chatMessages.push(newMessage);
   //console.log('User joined:', username);
   this.changeDetectorRef.detectChanges();
});
 

  });    
  
    this.username = localStorage.getItem('username');
    
    if(this.username!=null){
      this.loggedIn = true;
    }
    

  this.room = this.route.snapshot.paramMap.get('room');
    this.fetchChatMessages();
}

  /*fetchJoinedUsers(): void {
    this.http.get<string[]>('http://192.168.1.51:3000/joined-users').subscribe(
      (users: string[]) => {
        this.joinedUsers = users;
      },
      (error: any) => {
        console.error('Failed to fetch joined users:', error);
      }
    );
  }*/

  fetchChatMessages() {    
    // Send a GET request to the API endpoint to fetch the chat messages for the current room
    this.http.get<any>('http://192.168.1.51:3000/chat-rooms/' + this.room, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    })
      .subscribe(
        (response) => {
          console.log(response.chatMessages)
          this.chatMessages = response.chatMessages;
        },
        (error) => {
          console.error('Error fetching chat messages:', error);
          // Handle error (e.g., display error message)
        }
      );
  }

  sendMessage() {
    const messageData = {
      user: this.username,
      content: this.messageContent
    };

    //emitting a NewMessage event to the socket.io so that it can be 
    //broadcasted to all the clients connected in a particular chat room
    this.socket.emit('newMessage', messageData);
    this.messageContent = '';

    // Send a POST request to the API endpoint to send the chat message and store in db
    this.http.post<any>('http://192.168.1.51:3000/chat-rooms/' + this.room + '/messages', messageData, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    })
      .subscribe(
        (response) => {
          //alert(response.chatMessages);
          //this.socket.emit('newMessage', this.messageContent);
          //this.chatMessages.push(response.chatMessages);
          console.log(this.chatMessages);
          this.messageContent = '';
        },
        (error) => {
          console.error('Error sending message:', error);
          // Handle send message error (e.g., display error message)
        }
      );
  }

  leaveChatRoom(): void {    
    // Emit socket event to notify the server
    this.socket.emit('leaveChatRoom');
   
    this.socket.on('userLeft', (username:string) =>{     
     console.log("user left " + username)
      this.userleft = username;    

    });
    this.router.navigate(['/chat-rooms']);
  }

  logout(): void {
    alert("logout")
    // Disconnect the Socket.io connection
    this.socket.disconnect();
    
    // Remove user information from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('chatroom');
    localStorage.removeItem('token');
    
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
