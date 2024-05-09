const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  // Existing fields
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  aadharcard: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  address: {
    houseno: String,
    street: String,
    locality: String,
    state: String,
    country: String,
    pincode: String,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: {
      validator: function(v) {
        return isEmail(v);
      },
      message: props => `${props.value} is not a valid Gmail address!`
    }
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    validate: {
      validator: function(v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(v);
      },
      message: props => `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.`
    }
  },
  // // New messaging-related fields
  // messagesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  // messagesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

const helperSchema = new mongoose.Schema({
  // Existing fields
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  aadharcard: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  address: {
    houseno: String,
    street: String,
    locality: String,
    state: String,
    country: String,
    pincode: String,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: {
      validator: function(v) {
        return isEmail(v);
      },
      message: props => `${props.value} is not a valid Gmail address!`
    }
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    validate: {
      validator: function(v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(v);
      },
      message: props => `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.`
    }
  },
  rating: { type: Number, default: 0 },
  comments: [
    {
      content: String,
      author: String,
      datetime: { type: Date, default: Date.now }
    }
  ],
  // New messaging-related fields
  // messagesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  // messagesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

// Hash password before saving for user
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Hash password before saving for helper
helperSchema.pre("save", async function (next) {
    const helper = this;
    if (helper.isModified("password")) {
        helper.password = await bcrypt.hash(helper.password, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);
const Helper = mongoose.model("Helper", helperSchema);

module.exports = { User, Helper };
