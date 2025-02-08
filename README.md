# EcomDashboard

EcomDashboard is a modern e-commerce admin dashboard for managing products and secure authentication.

## Features
- **JWT Authentication**: Secure login/session management.
- **Product Management**: List, add, update, and delete products.
- **Logout**: Secure session termination.

## Technologies
- **Frontend**: React, Tailwind CSS, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Auth**: JSON Web Tokens (JWT)

## Getting Started
===================

### Prerequisites
- Node.js (v14+), npm/yarn, MongoDB

### Installation
1. **Clone & Install:**
   ```bash
   git clone https://github.com/yourusername/EcomDashboard.git
   cd EcomDashboard
   npm install
   ```

### Products
- **GET** `/api/products` - List products.
- **POST** `/api/products` - Add product.
- **PUT** `/api/products/:id` - Update product.
- **DELETE** `/api/products/:id` - Delete product.

## Usage
1. **Login** with admin credentials.
2. **Manage Products** via dashboard.
3. **Logout** to end session.

## Contributing
Fork the repo, make changes, and submit a pull request.

