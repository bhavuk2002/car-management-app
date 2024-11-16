# Car Management App

## Overview

The **Car Management App** is a web-based platform that allows users to manage car-related data effectively. It provides a RESTful API for performing CRUD operations and includes detailed API documentation powered by Swagger.

Try it out yourself, [click here](https://poetic-meerkat-1374dd.netlify.app).

## Features

- 🚗 Manage car records (Create, Read, Update, Delete).
- 📋 Filter and search cars by various attributes (e.g., brand, model, year).
- 🔧 User-friendly API documentation using Swagger.
- 📊 Extensible and scalable backend architecture.
- 🌐 Hosted API for seamless integration.

---

## Table of Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [API Documentation](#api-documentation)
4. [Tech Stack](#tech-stack)
5. [Contact](#contact)

---

## Demo

You can interact with the API directly through its hosted documentation:

🔗 [Working Project Demo](https://poetic-meerkat-1374dd.netlify.app)
🔗 [Swagger API Documentation](https://car-management-api-yy1q.onrender.com/api/docs/)

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/) (version 16.16.0 or higher)
- [React.js](https://react.dev/)
- Express.js
- Basic Deployement know how

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/bhavuk2002/car-management-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd car-management-app
   ```

3. Navigate to the backend:

   ```bash
   cd backend
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Configure environment variables:

   ```env
   PORT=5000
   JWT_TOKEN_SECRET=<YOUR_JWT_SECRET>
   ```

6. Run Backend Server:

   ```bash
   npm start
   ```

7. Navigate to the frontend:

   ```bash
   cd ../frontend
   ```

8. Install dependencies:

   ```bash
   npm install
   ```

9. Install dependencies:

   ```env
   REACT_APP_API_URL=<YOUR_BACKEND_SERVER_URL> || "http://localhost:5000"
   ```

10. Run Frontend Server:

    ```bash
    npm start
    ```

---

## API Documentation

The Car Management API is fully documented using Swagger. You can explore all available endpoints, their parameters, and responses.

### Explore Swagger Docs

- **Hosted documentation**: [API Docs](https://car-management-api-yy1q.onrender.com/api/docs/)
- **To view locally**:
  1. Start the server.
  2. Visit `http://localhost:5000/api/docs`.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: React.js
- **Documentation**: Swagger
- **Hosting**: Render(Backend), Netlify(Frontend)

---

## Contact

For any questions or feedback, feel free to contact:

- **Name**: Bhavuk Mittal
- **Email**: [vvbnmittal@gmail.com](mailto:vvbnmittal@gmail.com)
- **GitHub**: [bhavuk2002](https://github.com/bhavuk2002)
