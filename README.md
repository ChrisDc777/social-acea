<p align="center"><img src="https://github.com/user-attachments/assets/5ce0af63-8fe8-406f-ad7a-6d0b0625df13" alt="TheGram" width="600"/></p>

# <img src="https://github.com/user-attachments/assets/67594d95-a0ef-4585-b5e2-f28c38ab2f6d" alt="TheGram" width="30"/> TheGram 


TheGram is a social media platform social media platform that offers a range of modern features, including a vibrant home content feed, user authentication, and real-time messaging powered by Socket.IO.


If you're interested, you can try building additional features like the Explore page, Reels, Stories and integrating Notifications to enhance your experience further

Please note that if you're accessing the website, it may take a moment to load since it can be spun down with inactivity.

## Installation

Installation is needed in both frontend and backend folders using command

```bash
npm install
```

## Setup .env file

```javascript
PORT=...
MONGO_URI=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Start the app

You will need to update the start commands for both the frontend and backend, as well as the server startup in the backend, due to the production build of the files. After that use the following commands:

```javascript
// For frontend
npm run dev

// For backend
node server.js
```
