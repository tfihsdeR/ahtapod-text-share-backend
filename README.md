# Getting Started With "Ahtapod Text Share"

Welcome to the "Ahtapod Text Share" project! This guide will help you set up and run the frontend and backend parts of the application.

## Description
You can write a text and share it with others. Everyone can read this text. Also you can use this application as a blog thoug :)

## Main Technologies
- Next.js
- Node.js
- MongoDb
- React.js
- Express.js
- Next-Auth
- cors-policies
- cookies and tokens
- etc.

## Prerequisites
Before you begin, make sure you have [Node.js](https://nodejs.org/) installed on your system.

## Running the Backend
- Open your terminal.
- Download the backend project
    - ***git clone https://github.com/tfihsdeR/ahtapod-text-share-backend.git***

- Install the necessary dependencies:
    - ***npm install***

 - Start the development server:
    - ***npm run dev***

## Running the Frontend
- Open a new terminal window.
- Download to the frontend directory:
    - ***git clone https://github.com/tfihsdeR/ahtapod-text-share-frontend.git***
 
- Install any required dependencies:
    - ***npm install***
 
- Launch the frontend server:
    - ***npm run dev***

- Open a Browser
    - ***Navigate to: http://localhost:3000/***
 
## Login User
- Admin User
    - ***email:    testuser@test.com***
    - ***password: 123456***
 
- Default User
    - ***Just create a new user :)***
 
## Creating your first post
On the main page, you will find a button with '+' plus sign. Press on it and start writing :)

## API Endpoints
- User:
      - http://localhost:4000/user/create
              - user model: {email, password, name, image}
      - http://localhost:4000/user/readByEmail/:email
      - http://localhost:4000/user/readById/:id
      - http://localhost:4000/user/deleteById/:id
      - http://localhost:4000/user/deleteByEmail/:email
      - http://localhost:4000/user/update
              - user model: {name, image, password, newEmail}
      - http://localhost:4000/user/readAll  -> you can get this by admin account

- Post:
        - http://localhost:4000/post/create
                - post model: {title, content, summary} - > you should login
        - http://localhost:4000/post/readAll
        - http://localhost:4000/post/readById/:id
        - http://localhost:4000/post/removeById/:id  -> You should have the authorization
        - http://localhost:4000/post/updateById/:id  -> You should have the authorization

Now, both the frontend and backend servers should be running, and you can begin using the rastKanban application.
