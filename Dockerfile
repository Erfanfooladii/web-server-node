# Use specific Node version with Alpine
FROM node:22.16.0-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
