# Use the official Node.js 21 Alpine image as a base
FROM node:20-alpine

# Update the package repositories and install any available updates
RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port Next.js is running on
EXPOSE 3000

# Start the Next.js app
# CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "start"]