🌍 Travio – Full Stack Travel Listing Web Application

Travio is a full-stack web application that allows users to create, browse, review, and manage travel property listings with authentication and authorization.

The project demonstrates real-world backend architecture with secure user sessions, CRUD operations, server-side validation, and database relationships.


🚀 Features
👤 User Authentication & Authorization

User signup, login, and logout

Session-based authentication using Passport.js

Protected routes for logged-in users only

Ownership-based access (only owners can edit/delete listings)


🏠 Listings Management

Create, view, edit, and delete travel listings

Each listing includes:

Title

Description

Image URL

Price

Location & country


⭐ Reviews System

Users can add ratings and comments

Reviews linked to users and listings

Delete reviews functionality

🛡 Validation & Error Handling

Server-side validation using Joi

Custom error handling middleware

Flash messages for success & error feedback

📐 Clean Architecture

MVC structure

Separate routes, models, middleware, and validation

Async error handling wrapper

🧰 Tech Stack
Frontend

EJS Templates

Bootstrap

JavaScript

Backend

Node.js

Express.js

Passport.js

Database

MongoDB

Mongoose

Tools & Libraries

Joi (validation)

Express-session

Method-override

Connect-flash

📸 Screenshots:
Listing Page:
<img width="1910" height="966" alt="Screenshot 2026-02-14 195953" src="https://github.com/user-attachments/assets/619a251e-b783-4d33-8bc7-48c81aed11e4" />

Login Form:
<img width="1918" height="962" alt="Screenshot 2026-02-14 200021" src="https://github.com/user-attachments/assets/1e5d9b6f-4926-48ac-9dfb-8dcf09a7a24d" />

Signup Form:
<img width="1913" height="962" alt="Screenshot 2026-02-14 200036" src="https://github.com/user-attachments/assets/142b6e84-ba08-4057-b01b-5180a1a4b90a" />

Login success message:
<img width="1915" height="962" alt="Screenshot 2026-02-14 200117" src="https://github.com/user-attachments/assets/94138e55-c158-480f-b831-c8f1cfa0a5c4" />

Show listing page:
<img width="1916" height="957" alt="Screenshot 2026-02-14 200140" src="https://github.com/user-attachments/assets/c306f36d-ad8b-456c-ae5a-f0db93865abe" />

Reviews section:
<img width="1914" height="965" alt="Screenshot 2026-02-14 200154" src="https://github.com/user-attachments/assets/d0d614f0-b41e-4877-b7ec-edc0d4816b6d" />



⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/SiddhantAgre/Travio
cd travio

2. Install dependencies
npm install

3. Start MongoDB locally

Make sure MongoDB is running on:

mongodb://127.0.0.1:27017/travio

4. Run the server
node app.js


or (if using nodemon):

nodemon app.js

5. Open in browser
http://localhost:8080

📚 What I Learned

Building full-stack applications with Node.js & MongoDB

Authentication and session management

Secure route handling and authorization

Database relationships and populate queries

Server-side validation and error handling

MVC project structure



👨‍💻 Author

Siddhant K. Agre

GitHub: https://github.com/SiddhantAgre

LinkedIn: https://www.linkedin.com/in/siddhant-agre-b6a731225/

Email: Siddhantagre01@gmail.com
