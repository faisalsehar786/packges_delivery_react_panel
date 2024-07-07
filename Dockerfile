# Use an official Node.js runtime as a parent image
FROM node:20.10.0

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN yarn install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Run the Node.js server when the container launches
CMD ["npm", "start"]