const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vvbnmittal:MGMGISDvOFb5x8AZ@cluster0.ldp9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    // useNewUrlParser: true,
    // useCreateIndex: true // useCreateIndex is depriciated // both depriciated
  }
);
