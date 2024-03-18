# Use a base image with Node.js for building React app
FROM node:21-alpine as build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
# RUN npm run build

# Use a lighter base image for serving the app
FROM nginx:alpine

# Copy the built React app from the previous stage to the appropriate location in the container
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 8080 (assuming your web application runs on this port)
EXPOSE 8080

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
# Command to run the application
# CMD ["tail", "-f", "/dev/null"]