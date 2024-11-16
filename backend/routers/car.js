const express = require("express");
const Car = require("./models/Car");
const router = new express.Router();
const multer = require("multer");
const path = require("path");

const { auth } = require("./auth/auth");

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to the 'uploads' folder
    cb(null, "./backend/uploads");
  },
  filename: (req, file, cb) => {
    // Use original file name, or you can create a unique name
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// Create Car
// POST /car/create
// Create Car
// POST /car/create
/**
 * @swagger
 * /car/create:
 *   post:
 *     summary: Create a new car listing
 *     description: Allows an authenticated user to create a new car listing with images.
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *                 example: "2015 Honda Civic"
 *               description:
 *                 type: string
 *                 example: "A reliable car in good condition"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["sedan", "manual", "2015"]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Car successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
 *                   $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid request or validation failed
 *       401:
 *         description: Authentication required
 */
router.post(
  "/car/create",
  auth,
  upload.array("images", 10),
  async (req, res) => {
    const imageUrls = req.files.map((file) => `${file.filename}`);
    const car = new Car({
      ...req.body,
      images: imageUrls,
      owner: req.user._id,
    });
    try {
      await car.save();
      res.status(201).send({ car });
    } catch (e) {
      res.status(400).send({ e });
    }
  }
);

// All Car Details
// GET /cars
/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars for the authenticated user
 *     description: Fetches all cars listed by the authenticated user.
 *     tags:
 *       - Cars
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cars:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *       401:
 *         description: Authentication required
 *       404:
 *         description: No cars found
 */
router.get("/cars", auth, async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id });
    if (!cars) {
      res.status(400).send("No Car found!");
    }
    res.status(200).send({ cars });
  } catch (e) {
    res.status(401).send({ e });
  }
});

// get single car detail - View Car
// GET /car/:id
/**
 * @swagger
 * /car/{id}:
 *   get:
 *     summary: Get details of a single car
 *     description: Fetch the details of a specific car by ID.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */
router.get("/car/:id", auth, async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).send();
    }
    res.status(201).send({ car });
  } catch (e) {
    res.status(401).send({ e });
  }
});

// Update Car
// PATCH /car/:id
/**
 * @swagger
 * /car/{id}:
 *   patch:
 *     summary: Update car details
 *     description: Update the details of an existing car listing.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Car details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid request or validation failed
 *       404:
 *         description: Car not found
 */
router.patch("/car/:id", auth, upload.array("images", 10), async (req, res) => {
  // console.log(req .body);
  // console.log(req.files);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "tags", "images"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const car = await Car.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!car) {
      res.status(404).send();
    }

    if (req.files && req.files.length > 0) {
      // If an image is uploaded, save its path in the database
      console.log("inside imahes");
      const imageUrls = req.files.map((file) => `${file.filename}`);
      car["images"] = imageUrls;
    }

    updates.forEach((update) => {
      if (update !== "images") car[update] = req.body[update];
    });

    // console.log(car);

    await car.save();

    res.status(200).send(car);
  } catch (error) {
    res.status(400).send("Some error occured!", error);
  }
});

// Delete Car
// DELETE /car/:id
/**
 * @swagger
 * /car/{id}:
 *   delete:
 *     summary: Delete a car listing
 *     description: Remove a car listing by ID.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car successfully deleted
 *       404:
 *         description: Car not found
 */
router.delete("/car/:id", auth, async (req, res) => {
  try {
    const carId = req.params.id;
    // const car = Car.findById(carId);
    const car = await Car.deleteOne({ _id: carId });
    if (!car) {
      return res.status(404).send();
    }
    res.status(200).send(car);
  } catch (e) {
    res.status(401).send({ e });
  }
});

module.exports = router;
