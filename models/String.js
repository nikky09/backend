// // const mongoose = require("mongoose");

// // const StringSchema = new mongoose.Schema({
// //   content: {
// //     type: String,
// //     required: true,
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });

// // module.exports = mongoose.model("String", StringSchema);

// const mongoose = require("mongoose");

// const StringSchema = new mongoose.Schema({
//   // id: {
//   //   type: Number,
//   //   required: true,
//   //   unique: true // Ensure uniqueness
//   // },
//   content: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("String", StringSchema);

// Import the Mongoose library
const mongoose = require("mongoose");

// Define a schema for storing strings in the database
const StringSchema = new mongoose.Schema({

  content: {
    type: String,
    required: true,
  },
  
  phone: {
    type: String,
    required: true,
    min: 10
  },

  // The date and time when the string was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
   const Temp = mongoose.model("String", StringSchema);
   module.exports = Temp;
// Create a Mongoose model using the schema
// module.exports = mongoose.model("String", StringSchema);