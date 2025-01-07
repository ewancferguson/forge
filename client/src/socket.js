import { logger } from './utils/Logger.js';

let socket;


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
