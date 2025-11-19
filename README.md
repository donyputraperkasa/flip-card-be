# Flip Card Backend – NestJS API Service

This repository contains the backend service for the **Flip Card Web Application**.  
The backend is built using **NestJS** and provides a structured, modular, and scalable API for managing questions, answers, user data, and file uploads.

The backend communicates with a PostgreSQL database via **Prisma ORM**, and exposes RESTful endpoints to support all operations required by the frontend.

---

## 1. Project Overview

The Flip Card Backend is responsible for:

- Managing question data  
- Handling image uploads  
- Providing CRUD APIs for questions  
- Securing endpoints (if authentication is implemented)  
- Interacting with a relational database using Prisma  

This service is built with maintainability and scalability in mind, following a clean modular architecture.

---

## 2. Technology Stack

- **NestJS** – Backend framework  
- **TypeScript** – Primary language  
- **Prisma ORM** – Database ORM  
- **PostgreSQL** – Relational database  
- **Multer** – File uploads  
- **Class Validator & Class Transformer** – Data validation  

---

## 3. Features

### 3.1 Question Module
- Create question  
- Upload image for a question  
- Edit question  
- Delete question  
- Fetch all questions  

### 3.2 Image Handling
- Supports image upload with Multer  
- Validates file format and size  
- Stores image path for frontend usage  

---

## 4. Project Structure

```
flip-card-be/
 ├── src/
 │   ├── app.module.ts
 │   ├── main.ts
 │   ├── questions/
 │   │   ├── questions.controller.ts
 │   │   ├── questions.service.ts
 │   │   ├── dto/
 │   │   └── entities/
 ├── prisma/
 │   └── schema.prisma
 ├── uploads/
 │   └── (stored images)
 ├── package.json
 └── tsconfig.json
```

---

## 5. Environment Configuration

Create a `.env` file in the project root:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
PORT=4000
```

---

## 6. Running the Project

### 6.1 Install Dependencies
```bash
npm install
```

### 6.2 Apply Prisma Migrations
```bash
npx prisma migrate dev
```

### 6.3 Start the Server

Development mode:
```bash
npm run start:dev
```

Production build:
```bash
npm run start:prod
```

Server runs on:
```
http://localhost:4000
```

---

## 7. API Endpoints (Summary)

### **Questions**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/questions` | Get all questions |
| POST | `/questions` | Create question |
| PATCH | `/questions/:id` | Update question |
| DELETE | `/questions/:id` | Delete question |
| POST | `/questions/upload` | Upload image |

More detailed API documentation can be added if needed.

---

## 8. Deployment

This backend can be deployed on:

- **Railway**  
- **Render**  
- **Fly.io**  
- **Vercel (Serverless with edge limitations)**  
- **AWS / DigitalOcean / VPS**

Ensure environment variables and database connections are properly configured before deployment.

---

## 9. Resources

- NestJS Documentation: https://docs.nestjs.com  
- Prisma Documentation: https://www.prisma.io/docs  
- PostgreSQL Docs: https://www.postgresql.org/docs  

---

## 10. License

This project is licensed under the **MIT License**.
# flip-card-be
