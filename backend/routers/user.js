const express = require("express");
const User = require("../models/User.js");
const router = new express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user account
 *     description: This endpoint allows users to sign up and create a new account.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *                 example: securepassword123
 *     responses:
 *       201:
 *         description: User successfully created and authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "5f50c31f9b1dcd6e1b2dff6c"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                 token:
 *                   type: string
 *                   description: JWT token for user authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjUwYzMxZ...etc"
 *       400:
 *         description: Bad Request. Validation failed or user already exists
 *       500:
 *         description: Internal Server Error
 */

router.post("/user/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     description: This endpoint allows an existing user to log in and receive a JWT token for authentication.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: securepassword123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "5f50c31f9b1dcd6e1b2dff6c"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                 token:
 *                   type: string
 *                   description: JWT token for user authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjUwYzMxZ...etc"
 *       402:
 *         description: Email or password missing
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal Server Error
 */

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(402).send("Email or password missing.");
    const user = await User.findbyCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
