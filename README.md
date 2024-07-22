# Ahtapod Text Share

Welcome to the "Ahtapod Text Share" project! This guide will help you set up and run the frontend and backend parts of the application.

## Description
Ahtapod Text Share allows you to write and share text with others. Everyone can read the shared text, and you can also use this application as a blog.

## Main Technologies
- Next.js
- Node.js
- MongoDB
- React.js
- Express.js
- Next-Auth
- CORS policies
- Cookies and tokens

## Prerequisites
Before you begin, make sure you have Node.js installed on your system.

## Running the Backend
1. Open your terminal.
2. Clone the backend project:
    ```bash
    git clone https://github.com/tfihsdeR/ahtapod-text-share-backend.git
    ```
3. Navigate to the project directory:
    ```bash
    cd ahtapod-text-share-backend
    ```
4. Install the necessary dependencies:
    ```bash
    npm install
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```

## Running the Frontend
1. Open a new terminal window.
2. Clone the frontend project:
    ```bash
    git clone https://github.com/tfihsdeR/ahtapod-text-share-frontend.git
    ```
3. Navigate to the project directory:
    ```bash
    cd ahtapod-text-share-frontend
    ```
4. Install the necessary dependencies:
    ```bash
    npm install
    ```
5. Launch the frontend server:
    ```bash
    npm run dev
    ```
6. Open a browser and navigate to:
    ```
    http://localhost:3000/
    ```

## Login User
- ***I have created an online MongoDb Collection. You will see it env file.***
- **Admin User**
    - Email: `testuser@test.com`
    - Password: `123456`
- **Default User**
    - Just create a new user :)

## Creating Your First Post
On the main page, you will find a button with a '+' plus sign. Click on it and start writing!

## API Endpoints

### User
- `POST /user/create`
    - User model: `{email, password, name, image}`
- `GET /user/readByEmail/:email`
- `GET /user/readById/:id`
- `DELETE /user/deleteById/:id`
- `DELETE /user/deleteByEmail/:email`
- `PUT /user/update`
    - User model: `{name, image, password, newEmail}`
- `GET /user/readAll` (Admin account required)

### Post
- `POST /post/create`
    - Post model: `{title, content, summary}` (Login required)
- `GET /post/readAll`
- `GET /post/readById/:id`
- `DELETE /post/removeById/:id` (Authorization required)
- `PUT /post/updateById/:id` (Authorization required)

### You should send all cookies almost by every request. The backend api checks the user authentication by cookies.
