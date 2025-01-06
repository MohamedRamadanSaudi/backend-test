# Node.js Express API with Authentication

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MohamedRamadanSaudi/backend-test.git
cd /backend-test/challenge_1
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=3000

MONGODB_URI=mongodb://localhost:27017/backend-test #local
DATABASE_PASSWORD=your_database_password_if_the_database_deployed

ADMIN_PASSWORD=your_admin_password

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d
```

## API Endpoints (you can just import the "backend_test.postman_collection.json" file to any test tool like postman)

### Seed Admin

```
POST /admin     - make an admin with email "admin@admin.com" and password that in .env file
```

### Authentication

```
POST /auth/login     - User or Admin login
```

### Users

```
POST    /user        - Create a user (Admin only)
GET    /user        - Get all users (Admin only)
```

### Products

```
POST   /products          - Create new product (Admin only)
GET    /products          - Get all products
GET    /products/:id      - Get product by ID
PUT    /products/:id      - Update product (Admin only)
DELETE /products/:id      - Delete product (Admin only)
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## Error Handling

The API includes centralized error handling with appropriate status codes and error messages.

Example error response:

```json
{
  "status": "error",
  "message": "Not authorized to access this route"
}
```

## Body in creation

### User

```javascript
{
    "name": "Mohamed Ramadan",
    "email": "mo@gmail.com",
    "password": "test123",
    "role": "user" //default
    // "role": "admin"
}
```

### Product

```javascript
{
  "name": "String",
  "category": "String",
  "price": 500,
  "quantity": 10
}
```

## Data Models

### User Model

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  tokenVersion: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Running the Application

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm start
```
