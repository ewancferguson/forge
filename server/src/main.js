import express from 'express'
import { createServer } from 'http'
import { socketProvider } from './SocketProvider'
import { Startup } from './Startup'
import { DbConnection } from './db/DbConfig'
import { logger } from './utils/Logger'
import http from 'http';

// create server & socketServer
const app = express();
const httpServer = http.createServer(app);


if (process.env.NODE_ENV == 'dev') {
  // @ts-ignore
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
}

Startup.ConfigureGlobalMiddleware(app)
Startup.ConfigureRoutes(app)

// Establish Socket
socketProvider.initialize(httpServer)

// Connect to Atlas MongoDB
DbConnection.connect()


Startup.ConfigureGlobalMiddleware(app);
Startup.ConfigureRoutes(app, httpServer);


// Start Server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
