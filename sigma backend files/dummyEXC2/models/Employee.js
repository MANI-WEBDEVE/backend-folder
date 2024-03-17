const { default: mongoose } = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  language: String,
  package: Number,
  city: String,
  isEnginner: Boolean,
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
