import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthGuard } from '../../../authenticator/guards/auth.guard';

@WebSocketGateway()
export class MessagesGateway {
  @UseGuards(AuthGuard)
  @SubscribeMessage('message')
  async handleMessage(client: Server, payload: string): Promise<string> {
    client.emit('message', `Message received: ${payload}`);
    return 'Hello world!';
  }
}
