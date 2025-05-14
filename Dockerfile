# Use Node.js 16 as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files for dependency installation
COPY package.json yarn.lock ./

# Install dependencies using Yarn (ensuring consistency)
RUN yarn install --frozen-lockfile

# Copy the entire project (except files ignored by .dockerignore)
COPY . .

# Build the project (this creates the "build" folder)

RUN yarn build

# Expose the port used by your application
EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=production

# Start the application using the built files
CMD ["yarn", "start"]
