# Step 1: Use an official Node.js 20 runtime as a parent image for building the app
FROM node:20 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use a smaller Node.js 20 image to run the app
FROM node:20-slim

# Step 8: Set the working directory
WORKDIR /app

# Step 9: Copy the built app from the previous image
COPY --from=build /app/dist /app/dist

# Step 10: Install `serve` globally to serve the static files
RUN npm install -g serve

# Step 11: Expose port 3001
EXPOSE 6100

# Step 12: Serve the app
CMD ["serve", "-s", "dist", "-l", "6100"]
