# ⭐ Roxiler Store Rating Platform  
A full-stack web application for managing stores, rating stores, and role-based access control using **Node.js**, **Express**, **PostgreSQL**, **Sequelize**, **React**, and **Vite**.

This project implements:

- 🎯 User role system (Admin, Store Owner, User)
- ⭐ Store rating system
- 🏪 Store management
- 👤 User management
- 📊 Dashboards for Admin & Store Owner
- 🔐 JWT authentication
- 🎨 Clean and modern UI (React)

---

## 🚀 Features

### 👤 **User (Customer)**
- View all stores  
- Rate stores  
- Update ratings  
- See average ratings

### 🧑‍💼 **Store Owner**
- View their stores only  
- View all ratings given to their stores  
- See rating details (name, email, rating)  
- Average rating display

### 👑 **Admin**
- Create/store users  
- Create stores & assign owners  
- View all users  
- View all stores  
- View platform statistics  
- Protected admin dashboard

### 🔐 **Authentication**
- JWT-based login  
- Secure signup (default role = user)  
- Protected routes for roles  

---

## 🛠️ Tech Stack

### **Backend**
- Node.js  
- Express.js  
- PostgreSQL  
- Sequelize ORM  
- JWT Authentication  
- BCrypt password hashing  

### **Frontend**
- React + Vite  
- Context API for Auth  
- Custom CSS & modern UI  
- Protected routes based on roles  
- Rating components  

---

# 📁 Project Structure

```
/backend
  ├── src
  │   ├── controllers
  │   ├── routes
  │   ├── models
  │   ├── middlewares
  │   ├── config
  │   └── server.js
/frontend
  ├── src
  │   ├── pages
  │   ├── components
  │   ├── api
  │   ├── context
  │   └── hooks
  ├── index.html
  └── vite.config.js
```

---

# ⚙️ Installation & Setup

## 📌 1. Clone the repository

```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

---

# 🧩 Backend Setup

## 📌 2. Install dependencies

```bash
cd backend
npm install
```

## 📌 3. Configure `.env`

```
PORT=4000
DB_HOST=localhost
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=yourdbname
JWT_SECRET=your_jwt_secret
```

## 📌 4. Run database migrations

```bash
npx sequelize-cli db:migrate
```

## 📌 (Optional) Seed admin user

```bash
npx sequelize-cli db:seed:all
```

## 📌 5. Start backend

```bash
npm run dev
```

Backend runs at:

👉 **http://localhost:4000**

---

# 🖥️ Frontend Setup

## 📌 1. Install dependencies

```bash
cd ../frontend
npm install
```

## 📌 2. Create `.env`

```
VITE_API_URL=http://localhost:4000/api
```

## 📌 3. Start frontend

```bash
npm run dev
```

Frontend runs at:

👉 **http://localhost:5173**

---

# 🔐 Login Credentials

## 🧑‍💼 Admin Login (from seed)
```
Email: admin@example.com  
Password: Password@123
```

## 👤 User signup
Create from signup page.

---

# 🎬 Video Demonstration (Script Below)

A detailed script is provided below to help you record a 4–5 min demo video.

---

# 🤝 Contributing

Pull requests and suggestions are welcome!

