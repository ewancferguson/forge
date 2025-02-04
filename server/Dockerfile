
# Use an official Node.js runtime as the base image for the client build
FROM --platform=linux/amd64 node:20-slim AS client-builder
# Set the working directory in the client builder container
WORKDIR /app/client
# Copy the client application source code to the client builder container
COPY client ./
# Install client application dependencies
RUN npm install
# Build the client-side code
RUN npm run build
# Use a smaller base image for the final server image

FROM node:20-slim
# Set the working directory in the server container
WORKDIR /app/server
# Copy the server application source code to the server container
COPY server ./
# Install server application dependencies
RUN npm install
# Copy the built client files from the client builder container
# into the server's www directory
COPY --from=client-builder /app/client/dist /app/server/www
# Define the command to start your Node.js application
CMD [ "node", "index.js" ]