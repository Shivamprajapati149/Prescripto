# 🏥 Prescripto

> A modern full-stack healthcare appointment platform that makes doctor discovery, appointment booking, and online payments simple and convenient.

Prescripto is a **MERN-stack web application** designed to provide patients with a seamless way to find doctors, book appointments, and securely complete online payments from a single platform.

---

## 🌐 Live Demo

🚀 **Live Application:** [https://your-prescripto-live-link.com](https://prescripto.vercel.app/)

> Replace the above URL with your deployed Prescripto application link.

---

## ✨ Features

### 👤 Patient Features

* 🔐 Secure user authentication
* 🔎 Search and browse doctors
* 🩺 Filter doctors by specialization
* 👨‍⚕️ View detailed doctor profiles
* 📅 Book appointments
* 🕐 Select available date and time slots
* 💳 Secure online payment
* 📋 View upcoming and previous appointments
* ❌ Cancel appointments
* 👤 Update and manage profile

### 💳 Online Payment

Prescripto includes an integrated online payment system that allows patients to securely pay for their appointments.

**Payment Flow:**

```text
Select Doctor
      ↓
Choose Date & Time
      ↓
Confirm Appointment
      ↓
Proceed to Payment
      ↓
Payment Verification
      ↓
Appointment Confirmed
```

---

## 🛠️ Tech Stack

| Category       | Technologies                       |
| -------------- | ---------------------------------- |
| Frontend       | React.js, JavaScript, Tailwind CSS |
| Build Tool     | Vite                               |
| Routing        | React Router                       |
| HTTP Client    | Axios                              |
| Backend        | Node.js, Express.js                |
| Database       | MongoDB, Mongoose                  |
| Authentication | JWT                                |
| Payment        | Online Payment Gateway             |
| Image Storage  | Cloudinary                         |
| API            | REST API                           |

---

## 🏗️ Architecture

```text
                    ┌──────────────┐
                    │    Patient   │
                    └──────┬───────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ React Frontend  │
                  └────────┬────────┘
                           │
                       REST API
                           │
                           ▼
                  ┌─────────────────┐
                  │ Node + Express  │
                  └───────┬─────────┘
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
        ┌─────────┐  ┌──────────┐  ┌──────────┐
        │ MongoDB │  │Cloudinary│  │ Payment  │
        │         │  │          │  │ Gateway  │
        └─────────┘  └──────────┘  └──────────┘
```

---

## 📂 Project Structure

```text
Prescripto/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/prescripto.git
cd prescripto
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

PAYMENT_KEY=your_payment_gateway_key
PAYMENT_SECRET=your_payment_gateway_secret
```

> ⚠️ Never commit your `.env` file or expose secret keys publicly.

### 5. Run Backend

```bash
cd backend
npm run dev
```

### 6. Run Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🔐 Authentication & Security

Prescripto uses JWT-based authentication for protected user operations.

```text
User Login
    ↓
Credential Verification
    ↓
JWT Token Generated
    ↓
Authenticated Requests
    ↓
Backend Middleware
    ↓
Protected Resources
```

Sensitive operations such as appointment booking and payments are handled through authenticated API requests.

---

## 📅 Appointment Workflow

```text
Browse Doctors
      ↓
Select Doctor
      ↓
View Doctor Details
      ↓
Select Date & Time
      ↓
Book Appointment
      ↓
Complete Payment
      ↓
Payment Verification
      ↓
Appointment Confirmed
```

---

## 📌 Core Modules

### Authentication

Handles user registration, login, JWT generation, and protected routes.

### Doctor Discovery

Allows patients to browse doctors and filter them based on specialization.

### Appointment Management

Handles appointment creation, scheduling, viewing, and cancellation.

### Payment Integration

Processes online appointment payments and verifies successful transactions.

### Profile Management

Allows users to view and update their profile information.

### Cloud Storage

Cloudinary is used for storing and managing uploaded images.

---

## 🎯 Project Highlights

* Full-stack **MERN application**
* Secure authentication using **JWT**
* Real-world appointment booking workflow
* Integrated **online payment system**
* RESTful API architecture
* MongoDB database management
* Cloudinary integration
* Responsive and user-friendly interface
* Modular frontend and backend architecture

---

## 👨‍💻 Developer

### Shivam Prajapati

**B.Tech — Electronics & Communication Engineering**
**IIIT Bhagalpur**

---

## ⭐ Support

If you found this project useful, consider giving the repository a **⭐ Star** on GitHub.

---

**🚀 Live Demo:** [View Prescripto](https://your-prescripto-live-link.com)


If you like this project, consider giving the repository a **⭐ Star** on GitHub.

---

```
```
