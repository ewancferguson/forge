import { io } from 'socket.io-client';
import { logger } from './utils/Logger.js';

let socket;

export const connectSocket = () => {
    // If socket is already connected, return it
    if (socket) return socket;


    socket = io('http://localhost:3000');

    socket.on('connect', () => {
        logger.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
        logger.log('Disconnected from WebSocket server');
    });

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        logger.log('Disconnected from WebSocket server');
    }
};

export const sendMessage = (message) => {
    if (socket) {
        socket.emit('message', message);
    }
};

export const onMessage = (callback) => {
    if (socket) {
        socket.on('message', callback);
    }
};
