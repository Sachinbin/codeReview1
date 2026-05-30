# 🚀 Product Management System API

A secure and scalable RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing products with **JWT Cookie Authentication** and **Ownership-Based Authorization**.

The system ensures that users can only create, view, update, and delete their own products while maintaining secure authentication using Access & Refresh Tokens.

---

## ✨ Features

- User Registration & Login
- JWT Authentication (Access + Refresh Token)
- HttpOnly Cookie-Based Security
- Product CRUD Operations
- Ownership-Based Authorization
- Centralized Error Handling
- Modular Controller-Service Architecture
- MongoDB with Mongoose ODM
- Secure Password Hashing using Bcrypt

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Cookie Parser | Cookie Handling |
| Bcrypt | Password Hashing |

---

## 📁 Project Structure

```text
product-management-api/
├── config/
├── controllers/
├── middlewares/
├── models/
├── services/
├── utils/
├── app.js
├── index.js
├── .env
└── package.json
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone <repository-url>
cd product-management-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```env
PORT=3000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/product_db

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=7d
```

### Run Application

```bash
npm run dev
```

---

## 🔐 Authentication Flow

- Access Token: Short-lived authentication token
- Refresh Token: Long-lived session token
- Stored securely using HttpOnly Cookies
- Protected routes verified through middleware

---

## 🚀 API Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Products

```http
POST   /api/v1/products
GET    /api/v1/products
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id
```

---

## 🛡️ Security Features

- Bcrypt Password Hashing
- JWT Authentication
- HttpOnly Cookies
- Ownership Validation
- Centralized Error Handling

---

## ⚠️ Error Handling

| Status Code | Description |
|------------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 📌 Future Improvements

- Refresh Token Rotation
- RBAC (Role-Based Access Control)
- Product Search & Filtering
- Pagination
- Cloudinary Integration
- Swagger Documentation
- Unit & Integration Testing

---

## 👨‍💻 Author

**Sachin Bind**

Backend Developer | MERN Stack Developer
