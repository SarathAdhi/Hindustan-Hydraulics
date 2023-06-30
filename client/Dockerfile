# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
# COPY package.json package-lock.json ./

# Install app dependencies
# RUN npm ci --quiet

# Copy the entire app to the container
COPY . .
COPY .next/ /app/.next/
# Build the Next.js app
# RUN npm run build

# Expose the desired port (change it based on your app's configuration)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
