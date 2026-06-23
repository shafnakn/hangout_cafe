# The Hangout Cafe - Web App Setup


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

## 🚀 How to Run the Project 

https://hangoutcafepjr.vercel.app/
