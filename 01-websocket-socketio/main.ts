import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
class HelloGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Gateway iniciado — emitiendo cada 3 segundos...');
    setInterval(() => {
      this.server.emit('hello', {
        mensaje: 'Hola desde NestJS via Socket.io',
        hora: new Date().toLocaleTimeString()
      });
    }, 3000);
  }
}

@Module({ providers: [HelloGateway] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
}
bootstrap();