const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/car-management-app", {
  useNewUrlParser: true,
  // useCreateIndex: true // useCreateIndex is depriciated // both depriciated
});
