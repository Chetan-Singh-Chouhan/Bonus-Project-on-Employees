const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim:true
    },
    password: {
      type: String,
      required: true,
      unique:true,
      trim:true
    },
    role: {
      type: String,
     
      enum: ["Super Admin", "Admin", "Employee"],
      default:"Employee"
    },
  },
 
);

module.exports = mongoose.model("employee", employeeSchema);
