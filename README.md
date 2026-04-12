# The Hangout Cafe - Web App Setup

I have successfully created a modern, responsive cafe website for "The Hangout Cafe" according to your requirements. The project has been split into a frontend and a backend workspace under your `c:\Users\shafn\Desktop\hangout`.

## Features Implemented
### 🎨 General Design & Look
- A cozy "coffee vibe" color palette (warm browns, creams, deep coffee colors).
- Configured using **Tailwind CSS**.
- Fully responsive on all devices (mobile first menu).
- Uses **Framer Motion** for smooth, aesthetic animations.

### 🏠 Frontend application structure (`/frontend`):
- **Hero Section**: A large aesthetic landing screen with an animated tagline and call-to-action to explore the menu.
- **Menu Section**: Beautifully designed cards mimicking your uploaded photos (Shakes, Mojitos, Snacks, Combos etc.). It uses an image, item details and pricing with hover and scale animations.
- **WhatsApp Integration**: The "Order Now" button on each menu card opens up a pre-filled WhatsApp link referencing the dummy admin number, item name and pricing. It also asynchronously attempts to log the order to our backend server behind the scenes.
- **Admin Dashboard**: Hosted on `/admin` path. Displays real-time orders with a clean table. 

### ⚙️ Backend Structure (`/backend`):
- **Node.js + Express Server**: Handling incoming order details.
- **SQLite Database**: Includes two main components based on your prompt (automatically initializes database and the `orders` table dynamically).
- Provides `GET /api/orders` to fetch all orders for the Admin dashboard.
- Provides `POST /api/orders` to place new orders.
- Provides `PUT /api/orders/:id` to mark an order as completed or pending.

---

## 🚀 How to Run the Project Locally

### 1. Start the Backend Server
Open your terminal and navigate to the backend folder:
```powershell
cd c:\Users\shafn\Desktop\hangout\backend
npm start
```
*The server will start running on port 5000 and initialize `cafe.db`.*

### 2. Start the Frontend App
Open a completely new terminal and navigate to the frontend folder:
```powershell
cd c:\Users\shafn\Desktop\hangout\frontend
npm run dev
```
*The app will start on Vite's dev server (e.g., http://localhost:5173).*

Navigate through the beautiful site, place an order, and visit `http://localhost:5173/admin` to see the orders on the dashboard.
