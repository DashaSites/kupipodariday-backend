### Backend API for a wishlist platform

A layered REST API built with Nest.js, TypeScript, and PostgreSQL for managing users, gifts, wishlists, and contributions.

Functionality includes:
- User registration, login, and JWT-based authentication
- Entity relationships: one-to-many (users ↔ gifts, wishlists, offers) and many-to-many (wishlists ↔ gifts)
- Access control and role-based permissions using route guards
- Business rules enforcement (e.g. users cannot donate to their own gifts or exceed the gift price)

This project was part of a backend training module focused on complex data modeling and secure API design.

#### Technologies:
- Nest.js
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- bcrypt
- Passport.js

#### To run the project locally:
0. Open your terminal and navigate to the folder where you'd like to save the project
1. Clone the repository: git clone https://github.com/DashaSites/kupipodariday-backend.git
2. Enter the project directory: cd kupipodariday-backend
3. Install dependencies: npm install
4. Start the development server (with hot reload): npm run start:dev
   <br>
   Alternatively, to run once without hot reload: npm run start
6. Use Postman to test API endpoints
