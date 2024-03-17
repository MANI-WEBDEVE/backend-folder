const express = require("express");
const mongoose = require("mongoose");
const faker = require("faker");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Employes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create a mongoose schema for your data model
const dummySchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  // Add more fields as needed
});

const DummyModel = mongoose.model("Dummy", dummySchema);

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Set up a route to render the index page
app.get("/", (req, res) => {
  res.render("index");
});

// Set up a route to create dummy data
app.get("/employes", async (req, res) => {
  try {
    // Clear existing data in the collection
    await DummyModel.deleteMany({});

    // Insert dummy data
    for (let i = 0; i < 10; i++) {
      // Change the number based on your needs
      const dummyData = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        // Add more fields as needed
      };
      await DummyModel.create(dummyData);
    }

    res.send("Dummy data created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
