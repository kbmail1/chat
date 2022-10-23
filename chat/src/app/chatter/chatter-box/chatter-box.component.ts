import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chatter-box',
  templateUrl: './chatter-box.component.html',
  styleUrls: ['./chatter-box.component.scss']
})
export class ChatterBoxComponent implements OnInit {

  msgText: string = '';
  constructor( public chatService: ChatService,) { }

  ngOnInit(): void {
  }

  // local message. Add to messages. and emit.
  onSubmit(text: string): void {
    if (text) {
      console.log(`in onSubmit: ${text}`)
      const msg = {
        text,
        uuid: this.chatService.chatState.uuid,
        self: true,
        index: this.chatService.chatState.messages.length,
      }
      console.log(`full IMessage in onSubmit: ${msg}`)
      this.msgText = ''
      // save locally and emit to server.
      this.chatService.chatState.messages.push(msg)
      this.chatService.sendMessage(msg)

    }
  }
}
