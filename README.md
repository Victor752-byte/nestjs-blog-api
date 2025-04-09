# 📝 Personal Blog API

A RESTful API for a personal blog built using **NestJS**, **PostgreSQL**, and **TypeORM**. It supports user registration, authentication (JWT-based), profile updates, and basic CRUD operations on users.

---

## 🚀 Features

- User registration with password hashing (bcrypt)
- JWT-based authentication
- Login functionality
- Update and delete user profile
- Protected routes using `JwtAuthGuard`
- Structured using `AuthService` and `UsersService` with separation of concerns

---

## 🛠 Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Database:** PostgreSQL
- **Authentication:** JWT & Passport.js
- **Password Hashing:** bcryptjs

---
