import { ChatService } from './../chat.service';
import { RestClientService } from './../rest-client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IChatRoom } from '../data/chatRoom';
import { of, pipe, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {

  roomNames: string[] = []
  roomsGroup = new FormGroup({})

  constructor(
    public chatService: ChatService,
    public restClientService: RestClientService,
    public http: HttpClient,
  ) {

    this.roomNames.forEach(roomName => {
      this.roomsGroup.addControl(roomName, new FormControl(false))
    })

    // get rooms.
    console.log('chat rooms component getting rooms')
    this.http.get('http://localhost:3001/rooms').subscribe(
      rooms => {
        (rooms as IChatRoom[]).map((room) => {
          this.roomsGroup.addControl(room.name, new FormControl(false))
          this.roomNames.push(room.name)
        })
    })
  }

  ngOnInit(): void {

  }
}
