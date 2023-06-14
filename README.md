**TODO app for Marquee Equity**
Welcome to the TODO app for Marquee Equity. This app is a simple TODO app that allows users to add, edit, and delete tasks and their subtasks, with intuitive and smooth UX. This app uses local storage for data persistence and includes a mock login system. This project was built for a take-home interview.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Security](#security)
- [Screenshots](#screenshots)


## Overview
The application provides an easy-to-use interface for users to manage their todos and related subtasks. Users can add, remove, and mark tasks or subtasks as completed. The application also handles mock login and logout operations.

## Features
- User Authentication: Mock login feature that checks the user's email and password to grant access.
- Todo Management: Users can create, update, and delete todos.
- Subtask Management: Each todo can have multiple subtasks that can also be managed by the user.
- Persistence: User login data is persistent across sessions thanks to local storage.
- Auto-routing: Depending on the authentication state, the application automatically routes users to the correct page.

## Technologies
- React.js
- Vite
- Typescript
- Tailwind CSS
- React Router
- Local Storage



## Installation 
- Clone the repository  
- `cd` into the root directory  
- Run `npm install` to install dependencies 



## Running the app  
- Run `npm run dev` to start the development server 
- Navigate to `localhost:5173` (or the one shown in the console) to view the app    
-To log in, use the following credentials:  
    -Email: admin@gmail.com 
    -Password: admin    



## Security 
- The app uses local storage to store user data. This is not secure and should not be used in production. A better solution would be to use a database and a server to handle authentication and data storage.
-The project includes measures to prevent XSS attacks by sanitizing user inputs and decoding HTML entities when rendering tasks and subtasks



## Screenshots    

![Screenshot 2023-06-14 at 10-06-27 Marquee Equity Todo](https://github.com/singwithaashish/marquee-todo/assets/52033403/e2a6f872-bc41-46a7-84da-800de1938396)
![Screenshot 2023-06-14 at 10-08-30 Marquee Equity Todo](https://github.com/singwithaashish/marquee-todo/assets/52033403/7071e994-e2c2-49b2-b654-18e8588f0796)
![Screenshot 2023-06-14 at 10-08-02 Marquee Equity Todo](https://github.com/singwithaashish/marquee-todo/assets/52033403/90395636-16e7-48f3-8ef2-c1664c990c80)







