# 🏗️ Forge

Forge is a **social media-style** platform designed to connect **businesses and subcontractors** with clients who need solutions for various issues. Built with **Vue.js, Node.js, and MongoDB**, Forge simplifies networking and problem-solving, making it easier for professionals and customers to collaborate efficiently.

## 🚀 Features
- 🏢 **Business & Subcontractor Profiles** – Create and manage professional profiles.
- 📢 **Post Issues & Solutions** – Clients can post problems; professionals can offer solutions.
- 💬 **Messaging System** – Direct communication between clients and service providers.
- 📌 **Job Listings & Bidding** – Businesses can post jobs, and subcontractors can bid.
- ✅ **User Authentication** – Secure login and profile management.

## 🏗️ Tech Stack
- **Frontend:** Vue.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based authentication

## 🔧 Setup & Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/ewancferguson/forge.git
   cd forge
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env` file and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. **Run the application**
   ```sh
   npm run dev
   ```

## 📜 API Endpoints
| Method | Endpoint            | Description                |
|--------|--------------------|----------------------------|
| GET    | `/api/posts`       | Fetch all posts           |
| POST   | `/api/posts`       | Create a new post         |
| GET    | `/api/users/{id}`  | Get user profile          |
| POST   | `/api/messages`    | Send a message            |
| GET    | `/api/jobs`        | Get job listings          |

## 📫 Contact
- **GitHub:** [Ewan Ferguson](https://github.com/ewancferguson)
- **Portfolio:** [My Work](https://ewanferguson.org/)
- **Email:** ewanferg01@gmail.com

---
🔹 *Contributions and feedback are welcome! Feel free to fork and enhance the project.*
